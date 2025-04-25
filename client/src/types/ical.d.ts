declare module 'ical' {
  export interface CalendarComponent {
    type: string;
    params: any;
    start?: Date;
    end?: Date;
    summary?: string;
    description?: string;
    location?: string;
    uid?: string;
  }
  
  export function parseICS(icsContent: string): { [key: string]: CalendarComponent };
}