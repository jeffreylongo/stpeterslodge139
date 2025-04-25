import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin,
  Calendar as CalendarIcon,
  RefreshCw
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { format, parse, addMonths, subMonths, isAfter, addDays, isSameMonth, isSameYear } from 'date-fns';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { CalendarEvent as CalendarEventType } from '@/lib/types';

type CalendarDay = {
  date: number;
  events: CalendarEventType[];
};

const CalendarComponent: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Fetch all events
  const { data: allEvents, isLoading: eventsLoading } = useQuery<CalendarEventType[]>({
    queryKey: ['/api/events'],
  });
  
  // Debug logs to identify the problem
  React.useEffect(() => {
    if (allEvents) {
      console.log('All events from API:', allEvents.length);
      
      // Check for St. Petersburg Lodge events specifically
      const lodgeEvents = allEvents.filter((e: CalendarEventType) => e.calendarId === 1);
      console.log('St. Petersburg Lodge events (calendarId===1):', lodgeEvents.length);
      
      // Log calendar IDs to find the issue
      const uniqueCalendarIds = Array.from(new Set(allEvents.map((e: CalendarEventType) => e.calendarId)));
      console.log('Calendar IDs found in events:', uniqueCalendarIds);
      
      // Sample some events to identify the issue
      if (allEvents.length > 0) {
        console.log('Sample event:', allEvents[0]);
      }
    }
  }, [allEvents]);
  
  // Also fetch Lodge Calendar events directly for comparison
  const { data: directLodgeEvents } = useQuery<CalendarEventType[]>({
    queryKey: ['/api/calendars/1/events'],
    enabled: !eventsLoading 
  });
  
  // Track if we've already shown a sync notification
  const [hasShownSyncNotification, setHasShownSyncNotification] = useState<boolean>(false);
  
  // Sync calendars mutation
  const syncMutation = useMutation({
    mutationFn: () => apiRequest<{count: number}>('/api/calendars/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }),
    onSuccess: () => {
      // Invalidate and refetch events after syncing
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      
      // Only show the toast notification for manual sync actions or if we haven't shown it yet
      if (!hasShownSyncNotification) {
        toast({
          title: 'Calendars Synced',
          description: 'Successfully updated calendar events.',
        });
        setHasShownSyncNotification(true);
      }
    }
  });
  
  // Always sync calendar data when the component loads
  useEffect(() => {
    // Sync on component mount
    syncMutation.mutate();
  }, []);
  
  // Home page only shows St. Petersburg Lodge events (calendarId = 1)
  const events = React.useMemo(() => {
    // Filter to only include Lodge events (calendarId = 1)
    const lodgeEvents = allEvents ? allEvents.filter(event => event.calendarId === 1) : [];
    
    console.log("Using only Lodge events (calendarId=1). Count:", lodgeEvents.length);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    // Create the 10-day window - exactly like on Calendar page
    const tenDaysFromNow = new Date();
    tenDaysFromNow.setDate(today.getDate() + 10);
    
    // Filter events to show only the next 10 days
    const upcomingEvents = lodgeEvents.filter(event => {
      const eventDate = new Date(event.date);
      // Skip invalid dates
      if (isNaN(eventDate.getTime())) return false;
      
      // Include events from today to 10 days in the future
      return eventDate >= today && eventDate <= tenDaysFromNow;
    });
    
    console.log("Upcoming events for next 10 days count:", upcomingEvents.length);
    
    // Sort by date and limit to 10 events
    return upcomingEvents.sort((a: CalendarEventType, b: CalendarEventType) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    }).slice(0, 10); // Only show the next 10 upcoming events
  }, [allEvents]);
  
  const isLoading = eventsLoading || syncMutation.isPending;
  
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const renderMobileCalendar = () => {
    // Group events by date for mobile view
    const eventsByDate: { [key: string]: CalendarEventType[] } = {};
    
    if (events && events.length > 0) {
      events.forEach((event: CalendarEventType) => {
        const dateKey = new Date(event.date).toISOString().split('T')[0];
        if (!eventsByDate[dateKey]) {
          eventsByDate[dateKey] = [];
        }
        eventsByDate[dateKey].push(event);
      });
    }
    
    return (
      <div className="md:hidden space-y-4 mb-8">
        {Object.entries(eventsByDate).map(([dateStr, dayEvents]) => (
          <div key={dateStr} className="bg-white rounded-lg shadow-md overflow-hidden event-card">
            <div className="bg-primary-blue text-white p-3">
              <span className="font-bold">
                {format(parse(dateStr, 'yyyy-MM-dd', new Date()), 'EEEE, MMMM d, yyyy')}
              </span>
            </div>
            {dayEvents.map(event => (
              <div key={event.id} className="p-4 border-l-4 border-primary-gold">
                <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                <p className="text-sm text-gray-600 mb-2">
                  <Clock className="inline mr-1 h-4 w-4" />
                  {event.startTime} - {event.endTime}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <MapPin className="inline mr-1 h-4 w-4" />
                  {event.location}
                </p>
                <p className="text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  const renderDesktopCalendar = () => {
    // Generate calendar month view
    const daysInMonth = new Array(35).fill(null).map((_, index) => {
      return {
        date: index + 1,
        events: [] as CalendarEventType[]
      };
    });
    
    // Add events to days
    if (events && events.length > 0) {
      events.forEach((event: CalendarEventType) => {
        const eventDate = new Date(event.date);
        if (eventDate.getMonth() === currentDate.getMonth() && 
            eventDate.getFullYear() === currentDate.getFullYear()) {
          const day = eventDate.getDate();
          if (day <= daysInMonth.length) {
            daysInMonth[day - 1].events.push(event);
          }
        }
      });
    }
    
    return (
      <div className="hidden md:grid grid-cols-7 gap-1 mb-12">
        {/* Days of Week */}
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
          <div key={day} className="bg-primary-blue text-white text-center p-2 font-semibold">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {daysInMonth.map((day, index) => (
          <div key={index} className="bg-white border border-gray-200 p-2 calendar-day">
            <div className="text-sm text-gray-500 mb-1">{day.date}</div>
            {day.events.map(event => (
              <div 
                key={event.id} 
                className={`${
                  event.title.includes('Degree') ? 'bg-yellow-100 border-l-4 border-primary-gold' : 'bg-blue-100 border-l-4 border-primary-blue'
                } p-2 text-sm rounded mb-1`}
              >
                <div className="font-semibold">{event.title}</div>
                <div className="text-xs">{event.startTime}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  // Render the list of upcoming events only (simplified for home page)
  const renderUpcomingEvents = () => {
    // Use the events array that has the filtered events for next 10 days
    // This matches the behavior of the main calendar page
    
    if (!events || events.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <p className="text-gray-500">No upcoming events scheduled for the next 10 days.</p>
          <p className="mt-2 text-sm text-gray-400">Check back soon or visit the full calendar page.</p>
        </div>
      );
    }
    
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="divide-y">
          {events.map((event: CalendarEventType) => {
            // Convert to date object safely
            const eventDate = new Date(event.date);
            const isValidDate = !isNaN(eventDate.getTime());
            
            return (
              <div key={event.id} className="p-4 hover:bg-neutral-light transition">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-blue-lighter rounded-lg min-w-16 h-16 flex flex-col items-center justify-center text-primary-blue">
                    <span className="text-lg font-bold">{isValidDate ? format(eventDate, 'd') : '--'}</span>
                    <span className="text-xs uppercase">{isValidDate ? format(eventDate, 'MMM') : '---'}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                    <div className="flex flex-col md:flex-row md:gap-4 text-sm text-gray-600">
                      <p className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {event.startTime} - {event.endTime}
                      </p>
                      <p className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <section className="py-16 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-cinzel text-3xl text-primary-blue font-bold">Lodge Events</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              // For manual sync clicks, temporarily unset the notification flag to ensure we show a notification
              setHasShownSyncNotification(false);
              // Clear the localStorage flag so future auto-syncs will work
              localStorage.removeItem('initialCalendarLoadDone');
              syncMutation.mutate();
            }}
            disabled={syncMutation.isPending}
            className="hidden md:flex items-center"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
            Sync Calendar
          </Button>
        </div>
        <p className="text-lg mb-8">
          Stay up to date with upcoming lodge events for the next 10 days. See the full calendar for all scheduled activities.
        </p>
        
        {/* Calendar Content */}
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="bg-gray-200 h-64 w-full rounded"></div>
            <div className="bg-gray-200 h-16 w-full rounded"></div>
            <div className="bg-gray-200 h-16 w-full rounded"></div>
          </div>
        ) : (
          renderUpcomingEvents()
        )}
        
        {/* View All Link */}
        <div className="text-center mt-8">
          <Link to="/calendar">
            <div className="bg-primary-blue hover:bg-primary-blue-dark text-white px-8 py-3 rounded inline-flex items-center transition duration-300">
              <span>View Full Calendar</span>
              <CalendarIcon className="ml-2 h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CalendarComponent;
