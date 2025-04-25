// Common types used across the application

export interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
  slug: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string; // ISO date string
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  calendarId: number; // To link to calendar source
}

export interface Calendar {
  id: number;
  name: string;
  description: string;
  icsUrl: string;
  color: string;
  isActive: boolean;
}

export interface Officer {
  id: number;
  title: string;
  name: string;
  email: string;
  year: string; // "2023 - 2024"
  imageUrl?: string;
  order: number; // For sorting officers by rank
}

export interface PastMaster {
  id: number;
  name: string;
  year: number;
}

export interface Lodge {
  id: number;
  name: string;
  number: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  foundingYear: number;
  meetingDays: string;
  meetingTime: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  category: string;
}
