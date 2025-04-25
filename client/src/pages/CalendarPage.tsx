import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'wouter';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { ChevronRight, ChevronLeft, Calendar as CalendarIcon, MapPin, Clock, ChevronDown, ChevronUp, ExternalLink, RefreshCw } from 'lucide-react';
import { CalendarEvent, Calendar as CalendarType } from '@/lib/types';
import { format, parse, isSameMonth, isSameDay, isSameYear, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCalendars, setSelectedCalendars] = useState<number[]>([1, 2]); // Default to both calendars
  const [expandedEvents, setExpandedEvents] = useState<number[]>([]);
  // Track sync notifications to prevent too many toasts
  const [hasShownSyncNotification, setHasShownSyncNotification] = useState<boolean>(false);
  
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: events, isLoading: eventsLoading } = useQuery<CalendarEvent[]>({
    queryKey: ['/api/events'],
  });
  
  const { data: calendars, isLoading: calendarsLoading } = useQuery<CalendarType[]>({
    queryKey: ['/api/calendars'],
  });
  
  const syncMutation = useMutation({
    mutationFn: () => apiRequest<{count: number, events: any[]}>('/api/calendars/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }),
    onSuccess: (data) => {
      // Invalidate and refetch events after syncing
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
      
      // Only show notification if manually triggered or first time
      if (!hasShownSyncNotification) {
        toast({
          title: 'Calendars Synced',
          description: `Successfully imported ${data.count} new events.`,
        });
        setHasShownSyncNotification(true);
      }
    },
    onError: () => {
      toast({
        title: 'Sync Failed',
        description: 'Failed to sync calendar events. Please try again later.',
        variant: 'destructive',
      });
    }
  });
  
  const isLoading = eventsLoading || calendarsLoading || syncMutation.isPending;
  
  // Always sync calendar data when the page loads
  useEffect(() => {
    // Sync on initial load
    syncMutation.mutate();
  }, []);
  
  // Add debug information
  console.log('Current date for filtering:', currentDate);
  console.log('Selected calendars:', selectedCalendars);
  
  // First, filter events by selected calendars for the calendar grid
  const allEvents = !events ? [] : events.filter(event => {
    // Skip invalid dates
    const eventDate = new Date(event.date);
    if (isNaN(eventDate.getTime())) {
      console.log('Skipping event with invalid date:', event.title);
      return false;
    }
    
    // Include events from all calendars if no specific calendars are selected
    // Otherwise, only include events from selected calendars
    const isInSelectedCalendar = selectedCalendars.length === 0 || selectedCalendars.includes(event.calendarId);
    
    return isInSelectedCalendar;
  });
  
  // For the events list, show only events from now to 10 days in the future
  const today = new Date();
  const tenDaysFromNow = new Date();
  tenDaysFromNow.setDate(today.getDate() + 10);
  
  // Get upcoming events (next 10 days)
  const filteredEvents = allEvents
    .filter(event => {
      const eventDate = new Date(event.date);
      // Include events from today to 10 days in the future
      return eventDate >= today && eventDate <= tenDaysFromNow;
    })
    .sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
      return dateA.getTime() - dateB.getTime();
    });
  
  console.log('Filtered events count:', filteredEvents.length);
  
  // Get days in current month for calendar grid
  const getDaysInMonth = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = monthStart;
    const endDate = monthEnd;
    
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });
    
    const startDay = getDay(monthStart);
    const blankDaysAtStart = Array(startDay).fill(null);
    
    return [...blankDaysAtStart, ...daysInMonth];
  };
  
  const days = getDaysInMonth();
  
  // Group events by date - we use allEvents to include all events for the calendar grid
  // but will only show the ones in the current month in the grid
  const groupEventsByDate = () => {
    const grouped: Record<string, CalendarEvent[]> = {};
    
    allEvents.forEach(event => {
      const eventDate = new Date(event.date);
      
      if (isNaN(eventDate.getTime())) return;
      
      // Only include events from current month in the calendar grid
      if (!isSameMonth(eventDate, currentDate) || !isSameYear(eventDate, currentDate)) return;
      
      const dateKey = format(eventDate, 'yyyy-MM-dd');
      
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    
    return grouped;
  };
  
  const eventsByDate = groupEventsByDate();
  
  // Handle calendar filter toggle
  const toggleCalendarFilter = (calendarId: number) => {
    if (selectedCalendars.includes(calendarId)) {
      setSelectedCalendars(selectedCalendars.filter(id => id !== calendarId));
    } else {
      setSelectedCalendars([...selectedCalendars, calendarId]);
    }
  };
  
  // Handle event expansion
  const toggleEventExpansion = (eventId: number) => {
    if (expandedEvents.includes(eventId)) {
      setExpandedEvents(expandedEvents.filter(id => id !== eventId));
    } else {
      setExpandedEvents([...expandedEvents, eventId]);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-primary-blue-dark text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm mb-4">
              <Link to="/">
                <div className="hover:text-primary-gold transition">Home</div>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-gold">Calendar</span>
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold">Lodge Calendar</h1>
            <p className="mt-4 text-xl">Stay updated with upcoming meetings and events</p>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              {/* Month Navigation */}
              <div className="flex justify-between items-center mb-8">
                <button 
                  onClick={() => setCurrentDate(subMonths(currentDate, 1))}
                  className="p-2 hover:bg-neutral-light rounded-full transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                <h2 className="font-cinzel text-2xl font-bold">
                  {format(currentDate, 'MMMM yyyy')}
                </h2>
                
                <button 
                  onClick={() => setCurrentDate(addMonths(currentDate, 1))}
                  className="p-2 hover:bg-neutral-light rounded-full transition"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              
              {/* Calendar Grid */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 bg-primary-blue text-white">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center font-medium">{day}</div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                  {days.map((day, index) => {
                    const dateStr = day ? format(day, 'yyyy-MM-dd') : '';
                    const hasEvents = day && eventsByDate[dateStr] && eventsByDate[dateStr].length > 0;
                    const isToday = day && isSameDay(day, new Date());
                    
                    return (
                      <div 
                        key={index} 
                        className={`min-h-24 p-2 border border-gray-100 ${!day ? 'bg-gray-50' : ''}`}
                      >
                        {day && (
                          <>
                            <div className={`text-right ${isToday ? 'bg-primary-gold text-white rounded-full w-8 h-8 flex items-center justify-center ml-auto' : ''}`}>
                              {format(day, 'd')}
                            </div>
                            
                            {hasEvents && (
                              <div className="mt-1 space-y-1">
                                {eventsByDate[dateStr].map(event => (
                                  <div 
                                    key={event.id}
                                    className="bg-primary-blue-lighter rounded p-1 text-xs text-primary-blue cursor-pointer"
                                    onClick={() => toggleEventExpansion(event.id)}
                                  >
                                    {event.title}
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Events List */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-primary-blue text-white p-4">
                  <h3 className="font-cinzel text-xl font-bold">Upcoming Events (Next 10 Days)</h3>
                </div>
                
                <div className="divide-y">
                  {isLoading ? (
                    <div className="flex justify-center p-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
                    </div>
                  ) : filteredEvents.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <CalendarIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                      <p>No events scheduled for the next 10 days</p>
                      <p className="mt-2 text-sm">Try clicking the Sync button to fetch the latest events from our calendars.</p>
                    </div>
                  ) : (
                    filteredEvents.map(event => {
                      const isExpanded = expandedEvents.includes(event.id);
                      const eventDate = new Date(event.date);
                      const isValidDate = !isNaN(eventDate.getTime());
                      
                      return (
                        <div key={event.id} className="p-4">
                          <div 
                            className="flex justify-between items-start cursor-pointer"
                            onClick={() => toggleEventExpansion(event.id)}
                          >
                            <div>
                              <h4 className="font-bold text-lg">{event.title}</h4>
                              <p className="text-gray-600">
                                {isValidDate ? format(eventDate, 'EEEE, MMMM d, yyyy') : 'Date not available'}
                              </p>
                            </div>
                            <button className="p-1 rounded-full hover:bg-neutral-light transition">
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          
                          {isExpanded && (
                            <div className="mt-4 pl-4 border-l-2 border-primary-blue-lighter">
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <Clock className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                                  <div>
                                    <p className="font-medium">Time</p>
                                    <p>{event.startTime} - {event.endTime}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start">
                                  <MapPin className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                                  <div>
                                    <p className="font-medium">Location</p>
                                    <p>{event.location}</p>
                                  </div>
                                </div>
                                
                                {event.description && (
                                  <div className="mt-3">
                                    <p className="font-medium">Description</p>
                                    <p className="text-gray-600 mt-1">{event.description}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3">
              {/* Calendar Filters */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="bg-primary-blue text-white p-4 flex justify-between items-center">
                  <h3 className="font-cinzel text-xl font-bold">Calendar Sources</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-white border-white hover:bg-primary-blue-dark"
                    onClick={() => {
                      // For manual sync, temporarily unset the flag to ensure we show a notification
                      setHasShownSyncNotification(false);
                      // Clear the localStorage flag so future auto-syncs will work
                      localStorage.removeItem('initialCalendarLoadDone');
                      syncMutation.mutate();
                    }}
                    disabled={syncMutation.isPending}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
                    Sync
                  </Button>
                </div>
                
                <div className="p-4">
                  {isLoading ? (
                    <div className="flex justify-center p-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {calendars && Array.isArray(calendars) && calendars.map((calendar) => (
                        <div key={calendar.id} className="flex items-center">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCalendars.length === 0 || selectedCalendars.includes(calendar.id)}
                              onChange={() => toggleCalendarFilter(calendar.id)}
                              className="form-checkbox h-5 w-5 text-primary-blue rounded"
                            />
                            <span
                              className="ml-2 inline-block w-4 h-4 rounded-full"
                              style={{ backgroundColor: calendar.color }}
                            ></span>
                            <span className="ml-2">{calendar.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Regular Meeting Information */}
              <div className="bg-neutral-light p-6 rounded-lg shadow-md mb-8">
                <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-4">Regular Meetings</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CalendarIcon className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Stated Communications</p>
                      <p>Third Tuesday of each month</p>
                      <p>Dinner at 6:30 PM | Meeting at 7:30 PM</p>
                      <p className="mt-2 text-sm text-gray-600">
                        Location: <span className="font-medium">3325 1st St N, St. Petersburg, FL 33704</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subscribe to Calendar */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-4">Subscribe to Our Calendar</h3>
                  <p className="text-gray-600 mb-4">You can add our calendar to your own calendar application by subscribing to our ICS feed.</p>
                  
                  <a 
                    href="#" 
                    className="inline-flex items-center text-primary-blue hover:text-primary-gold transition"
                  >
                    <span>Add to your calendar</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CalendarPage;