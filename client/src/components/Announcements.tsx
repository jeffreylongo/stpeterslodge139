import React from 'react';
import { Link } from 'wouter';
import { 
  ChevronRight, 
  LucideIcon, 
  Megaphone, 
  CreditCard, 
  Calendar, 
  MapPin, 
  FileText, 
  HelpCircle, 
  ArrowRight 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Announcement {
  id: number;
  title: string;
  date: string;
  content: string;
  slug: string;
}

interface QuickLink {
  icon: LucideIcon;
  text: string;
  url: string;
}

const Announcements: React.FC = () => {
  const { data: announcements, isLoading } = useQuery<Announcement[]>({
    queryKey: ['/api/announcements'],
  });
  
  const quickLinks: QuickLink[] = [
    { icon: CreditCard, text: 'Pay Dues Online', url: '/shop' },
    { icon: Calendar, text: 'Lodge Calendar', url: '/calendar' },
    { icon: MapPin, text: 'Lodge Location', url: '/contact' },
    { icon: FileText, text: 'Lodge Forms', url: '/forms' },
    { icon: HelpCircle, text: 'Becoming a Mason', url: '/becoming-mason' },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Announcements */}
          <div className="w-full md:w-2/3">
            <h2 className="font-cinzel text-3xl text-primary-blue font-bold mb-8 flex items-center">
              <Megaphone className="text-primary-gold mr-3 h-6 w-6" />
              Latest News & Announcements
            </h2>
            
            {isLoading ? (
              <div className="animate-pulse space-y-6">
                <div className="bg-gray-200 p-6 rounded-lg h-40"></div>
                <div className="bg-gray-200 p-6 rounded-lg h-40"></div>
              </div>
            ) : announcements && announcements.length > 0 ? (
              <>
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="bg-neutral-light p-6 rounded-lg shadow-md mb-6 border-l-4 border-primary-gold">
                    <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-2">{announcement.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">Posted {announcement.date}</p>
                    <p className="mb-4">{announcement.content}</p>
                    <Link to={`/announcements/${announcement.slug}`}>
                      <div className="text-primary-blue hover:text-primary-gold inline-flex items-center font-medium transition cursor-pointer">
                        <span>Read more</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              <>
                {/* Fallback sample announcements when no data is available */}
                <div className="bg-neutral-light p-6 rounded-lg shadow-md mb-6 border-l-4 border-primary-gold">
                  <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-2">Stated Communication</h3>
                  <p className="text-sm text-gray-500 mb-3">Next meeting information</p>
                  <p className="mb-4">Our Stated Communication will be held on the third Tuesday of the month at 7:30 PM. Dinner will be served at 6:30 PM. Please RSVP for dinner by contacting the Junior Warden.</p>
                  <Link to="/calendar">
                    <div className="text-primary-blue hover:text-primary-gold inline-flex items-center font-medium transition cursor-pointer">
                      <span>View on calendar</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </Link>
                </div>
                
                <div className="bg-neutral-light p-6 rounded-lg shadow-md mb-6 border-l-4 border-primary-gold">
                  <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-2">Annual Lodge Picnic</h3>
                  <p className="text-sm text-gray-500 mb-3">Upcoming event</p>
                  <p className="mb-4">Join us for our annual lodge picnic at Fort De Soto Park. Bring your family and friends for a day of fun, food, and fellowship. The lodge will provide hamburgers and hot dogs.</p>
                  <Link to="/calendar">
                    <div className="text-primary-blue hover:text-primary-gold inline-flex items-center font-medium transition cursor-pointer">
                      <span>View on calendar</span>
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </Link>
                </div>
              </>
            )}
            
            {/* Removed the "View all announcements" link as we don't have a dedicated page for it yet */}
            <div className="text-center mt-8">
              <Link to="/about-139">
                <div className="inline-flex items-center text-primary-blue hover:text-primary-gold font-semibold transition">
                  <span>Learn more about our Lodge</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </Link>
            </div>
          </div>
          
          {/* Quick Links and Quote */}
          <div className="w-full md:w-1/3">
            {/* Quick Links */}
            <div className="bg-neutral-light p-6 rounded-lg shadow-md mb-8">
              <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <li key={index}>
                      <Link to={link.url}>
                        <div className="inline-flex items-center p-3 w-full hover:bg-white rounded transition">
                          <Icon className="text-primary-gold mr-3 w-5 h-5" />
                          <span>{link.text}</span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* Masonic Quote */}
            <div className="bg-primary-blue p-6 rounded-lg shadow-md">
              <h3 className="font-cinzel text-xl text-white font-bold mb-4">Masonic Wisdom</h3>
              <blockquote className="masonic-quote font-garamond text-white text-lg mb-4 leading-relaxed">
                The greatest gift a man can give to Masonry is to present to it a good and upright character upon which to build.
              </blockquote>
              <p className="text-primary-gold text-right font-medium">— Masonic Traditional</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
