import { 
  users, type User, type InsertUser,
  announcements, type Announcement, type InsertAnnouncement,
  officers, type Officer, type InsertOfficer,
  pastMasters, type PastMaster, type InsertPastMaster,
  calendarEvents, type CalendarEvent, type InsertCalendarEvent,
  calendars, type Calendar, type InsertCalendar,
  lodge, type Lodge, type InsertLodge,
  contactMessages, type ContactMessage, type InsertContactMessage,
  products, type Product, type InsertProduct
} from "@shared/schema";
import { fetchAndParseIcsCalendar, convertToAppCalendarEvent } from './icsCalendarService';

// Simple string hash function
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Lodge info
  getLodge(): Promise<Lodge | undefined>;
  
  // Announcements
  getAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(id: number): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  
  // Calendar and events
  getCalendars(): Promise<Calendar[]>;
  getEvents(): Promise<CalendarEvent[]>;
  getEventsByCalendar(calendarId: number): Promise<CalendarEvent[]>;
  syncIcsCalendarEvents(): Promise<CalendarEvent[]>;
  
  // Officers
  getOfficers(): Promise<Officer[]>;
  
  // Past Masters
  getPastMasters(): Promise<PastMaster[]>;
  
  // Contact messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private announcements: Map<number, Announcement>;
  private calendarEvents: Map<number, CalendarEvent>;
  private calendars: Map<number, Calendar>;
  private officers: Map<number, Officer>;
  private pastMasters: Map<number, PastMaster>;
  private contactMessages: Map<number, ContactMessage>;
  private products: Map<number, Product>;
  private lodgeInfo: Lodge | undefined;
  
  private userIdCounter: number;
  private announcementIdCounter: number;
  private calendarIdCounter: number;
  private eventIdCounter: number;
  private officerIdCounter: number;
  private pastMasterIdCounter: number;
  private contactMessageIdCounter: number;
  private productIdCounter: number;

  constructor() {
    // Initialize storage maps
    this.users = new Map();
    this.announcements = new Map();
    this.calendarEvents = new Map();
    this.calendars = new Map();
    this.officers = new Map();
    this.pastMasters = new Map();
    this.contactMessages = new Map();
    this.products = new Map();
    
    // Initialize ID counters
    this.userIdCounter = 1;
    this.announcementIdCounter = 1;
    this.calendarIdCounter = 1;
    this.eventIdCounter = 1;
    this.officerIdCounter = 1;
    this.pastMasterIdCounter = 1;
    this.contactMessageIdCounter = 1;
    this.productIdCounter = 1;
    
    // Add sample data
    this.initializeSampleData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Lodge info methods
  async getLodge(): Promise<Lodge | undefined> {
    return this.lodgeInfo;
  }
  
  // Announcement methods
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values());
  }
  
  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    return this.announcements.get(id);
  }
  
  async createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement> {
    const id = this.announcementIdCounter++;
    const newAnnouncement = { ...announcement, id };
    this.announcements.set(id, newAnnouncement);
    return newAnnouncement;
  }
  
  // Calendar methods
  async getCalendars(): Promise<Calendar[]> {
    return Array.from(this.calendars.values());
  }
  
  async getEvents(): Promise<CalendarEvent[]> {
    return Array.from(this.calendarEvents.values());
  }
  
  async getEventsByCalendar(calendarId: number): Promise<CalendarEvent[]> {
    return Array.from(this.calendarEvents.values())
      .filter(event => event.calendarId === calendarId);
  }
  
  async syncIcsCalendarEvents(): Promise<CalendarEvent[]> {
    try {
      // Get all calendars with ICS URLs
      const calendars = await this.getCalendars();
      const calendarSources = calendars
        .filter(cal => cal.isActive && cal.icsUrl)
        .map(cal => ({ id: cal.id, url: cal.icsUrl }));
      
      if (calendarSources.length === 0) {
        console.log('No active calendars with ICS URLs found');
        return [];
      }
      
      // Fetch and parse events from all calendar sources
      const allEventsPromises = calendarSources.map(source => 
        fetchAndParseIcsCalendar(source.url, source.id)
      );
      
      const allIcsEvents = await Promise.all(allEventsPromises);
      const flattenedIcsEvents = allIcsEvents.flat();
      
      console.log(`Fetched ${flattenedIcsEvents.length} events from ICS sources`);
      
      // Convert to our application's event format
      const appEvents = flattenedIcsEvents.map(convertToAppCalendarEvent);
      
      // Clear all existing events before adding new ones
      const calendarIds = calendarSources.map(source => source.id);
      
      // Remove existing events that came from these calendars
      const existingEvents = Array.from(this.calendarEvents.values());
      for (const event of existingEvents) {
        if (calendarIds.includes(event.calendarId)) {
          this.calendarEvents.delete(event.id);
        }
      }
      
      // Add the new events to our storage
      const newEvents: CalendarEvent[] = [];
      
      for (const event of appEvents) {
        // Use a more unique ID based on title, date and calendarId
        const uniqueIdBase = `${event.title}-${event.date}-${event.calendarId}`.replace(/\W/g, '');
        const uniqueId = Math.abs(hashCode(uniqueIdBase)) % 1000000; // Simple hash function
        
        const newEvent: CalendarEvent = {
          ...event,
          id: uniqueId
        };
        
        // Add all events (we've already cleared the old ones)
        this.calendarEvents.set(newEvent.id, newEvent);
        this.eventIdCounter = Math.max(this.eventIdCounter, newEvent.id + 1);
        newEvents.push(newEvent);
      }
      
      console.log(`Successfully synced ${newEvents.length} events from ICS sources`);
      return newEvents;
    } catch (error) {
      console.error('Error syncing ICS calendar events:', error);
      return [];
    }
  }
  
  // Officer methods
  async getOfficers(): Promise<Officer[]> {
    return Array.from(this.officers.values()).sort((a, b) => a.order - b.order);
  }
  
  // Past Master methods
  async getPastMasters(): Promise<PastMaster[]> {
    return Array.from(this.pastMasters.values())
      .sort((a, b) => b.year - a.year); // Sort by year descending
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.contactMessageIdCounter++;
    const newMessage = { 
      ...message, 
      id, 
      createdAt: new Date(), 
      isRead: false 
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  // Initialize with sample data
  private initializeSampleData() {
    // Sample lodge info
    this.lodgeInfo = {
      id: 1,
      name: "St. Petersburg Lodge",
      number: 139,
      address: "240 Mirror Lake Dr N",
      city: "St. Petersburg",
      state: "FL",
      zip: "33701",
      phone: "(727) 555-1234",
      email: "info@stpetelodge139.org",
      foundingYear: 1894,
      meetingDays: "Tuesday",
      meetingTime: "7:30 PM"
    };
    
    // Sample announcements
    const announcements: Announcement[] = [
      {
        id: 1,
        title: "Stated Communication",
        content: "Our next Stated Communication will be held on the third Tuesday of this month. Dinner will be served at 6:30 PM followed by the meeting at 7:30 PM.",
        date: new Date("2023-04-18T19:30:00"),
        author: 1,
        slug: "stated-communication-april-2023",
        isPublished: true
      },
      {
        id: 2,
        title: "Charity Golf Tournament",
        content: "Join us for our annual charity golf tournament at Feather Sound Country Club. All proceeds benefit the Shriners Hospitals for Children.",
        date: new Date("2023-05-15T08:00:00"),
        author: 1,
        slug: "charity-golf-tournament-2023",
        isPublished: true
      }
    ];
    
    announcements.forEach(a => {
      this.announcements.set(a.id, a);
      this.announcementIdCounter = Math.max(this.announcementIdCounter, a.id + 1);
    });
    
    // Calendar sources with real ICS URLs
    const calendars: Calendar[] = [
      {
        id: 1,
        name: "Lodge Calendar",
        description: "Official events for St. Petersburg Lodge No. 139",
        icsUrl: "https://calendar.google.com/calendar/ical/stpetersburglodge139%40gmail.com/public/basic.ics",
        color: "#1a4b8f",
        isActive: true
      },
      {
        id: 2,
        name: "SMMA Calendar",
        description: "Masters and Wardens Association Events",
        icsUrl: "https://localendar.com/public/MastersAndWardens?style=X2",
        color: "#c6a84a",
        isActive: true
      }
    ];
    
    calendars.forEach(c => {
      this.calendars.set(c.id, c);
      this.calendarIdCounter = Math.max(this.calendarIdCounter, c.id + 1);
    });
    
    // Sample calendar events
    const events: CalendarEvent[] = [
      {
        id: 1,
        title: "Stated Communication",
        description: "Monthly business meeting for April. Dinner served at 6:30 PM.",
        date: new Date("2023-04-18T19:30:00"), // Third Tuesday of April 2023
        startTime: "19:30",
        endTime: "21:30",
        location: "St. Petersburg Lodge No. 139, 3325 1st St N",
        calendarId: 1
      },
      {
        id: 2,
        title: "Stated Communication",
        description: "Monthly business meeting for May. Dinner served at 6:30 PM.",
        date: new Date("2023-05-16T19:30:00"), // Third Tuesday of May 2023
        startTime: "19:30",
        endTime: "21:30",
        location: "St. Petersburg Lodge No. 139, 3325 1st St N",
        calendarId: 1
      },
      {
        id: 3,
        title: "Stated Communication",
        description: "Monthly business meeting for June. Dinner served at 6:30 PM.",
        date: new Date("2023-06-20T19:30:00"), // Third Tuesday of June 2023
        startTime: "19:30",
        endTime: "21:30",
        location: "St. Petersburg Lodge No. 139, 3325 1st St N",
        calendarId: 1
      },
      {
        id: 4,
        title: "21st Masonic District Meeting",
        description: "Quarterly District meeting for all lodges in the 21st Masonic District",
        date: new Date("2023-05-05T19:00:00"),
        startTime: "19:00",
        endTime: "21:00",
        location: "Nitram Lodge No. 188",
        calendarId: 2
      }
    ];
    
    events.forEach(e => {
      this.calendarEvents.set(e.id, e);
      this.eventIdCounter = Math.max(this.eventIdCounter, e.id + 1);
    });
    
    // Sample officers
    const officers: Officer[] = [
      {
        id: 1,
        title: "Worshipful Master",
        name: "John Smith",
        email: "master@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 1
      },
      {
        id: 2,
        title: "Senior Warden",
        name: "Robert Johnson",
        email: "seniorwarden@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 2
      },
      {
        id: 3,
        title: "Junior Warden",
        name: "Michael Williams",
        email: "juniorwarden@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 3
      },
      {
        id: 4,
        title: "Treasurer",
        name: "William Brown",
        email: "treasurer@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 4
      },
      {
        id: 5,
        title: "Secretary",
        name: "John Livingston",
        email: "secretary@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 5
      },
      {
        id: 6,
        title: "Senior Deacon",
        name: "Thomas Wilson",
        email: "seniordeacon@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 6
      },
      {
        id: 7,
        title: "Junior Deacon",
        name: "Charles Miller",
        email: "juniordeacon@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 7
      },
      {
        id: 8,
        title: "Senior Steward",
        name: "David Thompson",
        email: "seniorsteward@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 8
      },
      {
        id: 9,
        title: "Junior Steward",
        name: "Richard Anderson",
        email: "juniorsteward@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 9
      },
      {
        id: 10,
        title: "Chaplain",
        name: "Joseph White",
        email: "chaplain@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 10
      },
      {
        id: 11,
        title: "Tyler",
        name: "Edward Harris",
        email: "tyler@stpetelodge139.org",
        year: "2023 - 2024",
        imageUrl: null,
        order: 11
      }
    ];
    
    officers.forEach(o => {
      this.officers.set(o.id, o);
      this.officerIdCounter = Math.max(this.officerIdCounter, o.id + 1);
    });
    
    // Sample past masters
    // Based on real data from St. Petersburg Lodge
    const pastMasters: PastMaster[] = [
      // Recent Past Masters
      { id: 1, name: "W∴ Michael Davino", year: 2023 },
      { id: 2, name: "W∴ George Thomas", year: 2022 },
      { id: 3, name: "W∴ Kenneth Ruckdeschel", year: 2021 },
      { id: 4, name: "W∴ Henry L. King", year: 2020 },
      { id: 5, name: "W∴ William B. Reavis", year: 2019 },
      { id: 6, name: "W∴ Michael J. Scionti", year: 2018 },
      { id: 7, name: "W∴ Martin A. Greif", year: 2017 },
      { id: 8, name: "W∴ Bruce M. Pohlmeyer", year: 2016 },
      { id: 9, name: "W∴ William B. Siegrist", year: 2015 },
      { id: 10, name: "W∴ Louis C. Thomas", year: 2014 },
      { id: 11, name: "W∴ Leonard V. LaSala", year: 2013 },
      { id: 12, name: "W∴ Raymond A. Harmer", year: 2012 },
      { id: 13, name: "W∴ Randall C. Taylor", year: 2011 },
      { id: 14, name: "W∴ James A. Borowski", year: 2010 },
      { id: 15, name: "W∴ Robert Mantello", year: 2009 },
      { id: 16, name: "W∴ Sean C. Wilson", year: 2008 },
      { id: 17, name: "W∴ Justin K. McGlynn", year: 2007 },
      { id: 18, name: "W∴ Raymond E. Martin, Jr.", year: 2006 },
      { id: 19, name: "W∴ Scott I. Carson", year: 2005 },
      { id: 20, name: "W∴ Kenneth F. Williams", year: 2004 },
      { id: 21, name: "W∴ Michael J. Adema", year: 2003 },
      { id: 22, name: "W∴ Timothy R. Hansen", year: 2002 },
      { id: 23, name: "W∴ Emmett W. Mills, Jr.", year: 2001 },
      { id: 24, name: "W∴ John W. Morgan", year: 2000 },
      
      // Historical Masters (first and other significant)
      { id: 25, name: "W∴ W. W. Coleman", year: 1894 },
      { id: 26, name: "W∴ Edward T. Davis", year: 1895 },
      { id: 27, name: "W∴ Walter Scott", year: 1900 },
      { id: 28, name: "W∴ Richard A. Costello", year: 1994 }
    ];
    
    pastMasters.forEach(pm => {
      this.pastMasters.set(pm.id, pm);
      this.pastMasterIdCounter = Math.max(this.pastMasterIdCounter, pm.id + 1);
    });
    
    // Sample products
    const products: Product[] = [
      {
        id: 1,
        name: "Annual Dues",
        description: "Annual membership dues for St. Petersburg Lodge No. 139",
        price: 150.00,
        category: "Dues",
        imageUrl: null,
        isActive: true
      },
      {
        id: 2,
        name: "Meal Plan",
        description: "Annual meal plan for stated communications and special events",
        price: 100.00,
        category: "Food",
        imageUrl: null,
        isActive: true
      },
      {
        id: 3,
        name: "Lodge Polo Shirt",
        description: "Blue polo shirt with embroidered lodge emblem",
        price: 35.00,
        category: "Apparel",
        imageUrl: null,
        isActive: true
      }
    ];
    
    products.forEach(p => {
      this.products.set(p.id, p);
      this.productIdCounter = Math.max(this.productIdCounter, p.id + 1);
    });
  }
}

export const storage = new MemStorage();
