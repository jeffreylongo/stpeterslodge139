import { CalendarEvent } from '@shared/schema';
import ical from 'ical';

// Use native fetch instead of node-fetch
const fetch = globalThis.fetch;

export interface ICalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
  calendarId: number;
}

export async function fetchAndParseIcsCalendar(url: string, calendarId: number): Promise<ICalendarEvent[]> {
  try {
    console.log(`Fetching calendar data from: ${url} for calendar ID: ${calendarId}`);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ICS calendar: ${response.statusText}`);
    }
    
    const icsContent = await response.text();
    console.log(`Received ICS content. Size: ${icsContent.length} bytes`);
    console.log(`Content sample: ${icsContent.substring(0, 100)}...`);
    
    const parsed = ical.parseICS(icsContent);
    const eventCount = Object.keys(parsed).length;
    console.log(`Parsed ${eventCount} items from ICS content`);
    
    // Map ICS events to our application's event format
    const events: ICalendarEvent[] = [];
    let veventCount = 0;
    
    for (const key in parsed) {
      const event = parsed[key];
      
      // Only process VEVENT types
      if (event.type !== 'VEVENT') continue;
      veventCount++;
      
      const startDate = event.start || new Date();
      const endDate = event.end || new Date(startDate.getTime() + 3600000); // Default to 1 hour if no end time
      
      // Log event details for debugging
      console.log(`Processing event: "${event.summary}", start: ${startDate.toISOString()}`);
      
      events.push({
        id: event.uid || `ics-${calendarId}-${key}`,
        title: event.summary || 'Untitled Event',
        description: event.description || '',
        start: startDate,
        end: endDate,
        location: event.location || '',
        calendarId
      });
    }
    
    console.log(`Successfully extracted ${events.length}/${veventCount} VEVENT items from calendar ${calendarId}`);
    return events;
  } catch (error) {
    console.error(`Error fetching or parsing ICS calendar from ${url}:`, error);
    return [];
  }
}

export function convertToAppCalendarEvent(icsEvent: ICalendarEvent): CalendarEvent {
  return {
    id: Number(icsEvent.id.replace(/\D/g, '')) % 1000000, // Convert string ID to a number
    title: icsEvent.title,
    description: icsEvent.description || '',
    date: icsEvent.start, // Use the Date object directly
    startTime: icsEvent.start.toTimeString().substring(0, 5), // Format as HH:MM
    endTime: icsEvent.end.toTimeString().substring(0, 5), // Format as HH:MM
    location: icsEvent.location || 'No location specified',
    calendarId: icsEvent.calendarId
  };
}

// Function to update calendars in storage from ICS sources
export async function syncCalendarsFromIcsSources(
  calendarSources: Array<{ id: number, url: string }>,
  updateCalendarEvents: (events: CalendarEvent[]) => Promise<void>
): Promise<void> {
  try {
    // Fetch and parse all calendar sources
    const allEventsPromises = calendarSources.map(source => 
      fetchAndParseIcsCalendar(source.url, source.id)
    );
    
    const allIcsEvents = await Promise.all(allEventsPromises);
    const flattenedIcsEvents = allIcsEvents.flat();
    
    // Convert ICS events to our application format
    const appEvents = flattenedIcsEvents.map(convertToAppCalendarEvent);
    
    // Update the storage with the new events
    await updateCalendarEvents(appEvents);
    
    console.log(`Successfully synced ${appEvents.length} events from ${calendarSources.length} ICS sources`);
  } catch (error) {
    console.error('Error syncing calendars from ICS sources:', error);
  }
}