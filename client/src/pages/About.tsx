import { useState } from 'react';
import { Link } from 'wouter';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { ChevronRight, MapPin, Phone, Mail, Clock, ExternalLink, ChevronDown } from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
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
              <span className="text-primary-gold">About Our Lodge</span>
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold">About Lodge #139</h1>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-2/3">
              {/* Tabs */}
              <div className="flex flex-wrap mb-8 border-b">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`py-3 px-5 font-medium ${activeTab === 'overview' ? 'text-primary-blue border-b-2 border-primary-gold' : 'text-gray-500'}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`py-3 px-5 font-medium ${activeTab === 'mission' ? 'text-primary-blue border-b-2 border-primary-gold' : 'text-gray-500'}`}
                >
                  Mission &amp; Values
                </button>
                <button
                  onClick={() => setActiveTab('meetings')}
                  className={`py-3 px-5 font-medium ${activeTab === 'meetings' ? 'text-primary-blue border-b-2 border-primary-gold' : 'text-gray-500'}`}
                >
                  Meetings
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="prose prose-lg max-w-none">
                {activeTab === 'overview' && (
                  <div>
                    <p className="lead text-xl">St. Petersburg Lodge No. 139 is a vibrant Masonic Lodge with a rich history dating back to 1894. We are committed to promoting the timeless principles of Freemasonry while building meaningful bonds of brotherhood.</p>
                    
                    <p>Our Lodge is part of the Grand Lodge of Florida and has been a cornerstone of the St. Petersburg community for over 125 years. Established in 1894 under the leadership of Brother W. W. Coleman, we've played a pivotal role in the growth of St. Petersburg. We welcome men of good character who are interested in personal growth, ethical development, and community service.</p>
                    
                    <h2 className="font-cinzel text-2xl text-primary-blue font-bold mt-8 mb-4">Who We Are</h2>
                    <p>Our membership includes men from all walks of life, professions, and backgrounds. What unites us is a commitment to our Masonic values and a desire to improve ourselves while contributing positively to our community.</p>
                    
                    <div className="my-8 p-6 bg-neutral-light rounded-lg shadow-md">
                      <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-4">Why Join Our Lodge?</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Experience the rich traditions of Freemasonry in a supportive environment</li>
                        <li>Develop lasting friendships with like-minded individuals</li>
                        <li>Opportunities for personal growth and leadership development</li>
                        <li>Participate in charitable activities and community service</li>
                        <li>Access to Masonic education and self-improvement resources</li>
                      </ul>
                    </div>
                    
                    <p>To learn more about our Lodge, please explore our website or <Link to="/contact"><span className="text-primary-blue font-medium hover:text-primary-gold">contact us</span></Link> with any questions. If you're interested in becoming a Mason, visit our <Link to="/becoming-mason"><span className="text-primary-blue font-medium hover:text-primary-gold">How to Become a Mason</span></Link> page.</p>
                  </div>
                )}
                
                {activeTab === 'mission' && (
                  <div>
                    <p className="lead text-xl">St. Petersburg Lodge No. 139 is guided by the fundamental principles of Freemasonry: Brotherly Love, Relief, and Truth.</p>
                    
                    <div className="my-8 grid md:grid-cols-3 gap-6">
                      <div className="bg-neutral-light p-6 rounded-lg shadow-md">
                        <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-3">Brotherly Love</h3>
                        <p>We practice regard for the whole human race and strive to be a positive influence in our communities. We foster an environment where men from diverse backgrounds can find common ground and mutual respect.</p>
                      </div>
                      
                      <div className="bg-neutral-light p-6 rounded-lg shadow-md">
                        <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-3">Relief</h3>
                        <p>We believe in the duty to relieve the suffering of others to the best of our ability. Our lodge supports various charitable causes and provides assistance to those in need, both within and outside the Masonic community.</p>
                      </div>
                      
                      <div className="bg-neutral-light p-6 rounded-lg shadow-md">
                        <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-3">Truth</h3>
                        <p>We are committed to the pursuit of knowledge, understanding, and personal growth. Through education and self-reflection, we seek to improve ourselves and to be honorable in all our dealings.</p>
                      </div>
                    </div>
                    
                    <h2 className="font-cinzel text-2xl text-primary-blue font-bold mt-8 mb-4">Our Vision</h2>
                    <p>St. Petersburg Lodge No. 139 strives to be a thriving center of Masonic light and excellence in our community. We aim to preserve and transmit the ancient traditions of Freemasonry while adapting to the needs of modern men. Our vision is to create an environment where each member can achieve his highest potential through Masonic teachings and fellowship.</p>
                    
                    <h2 className="font-cinzel text-2xl text-primary-blue font-bold mt-8 mb-4">Our Values</h2>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Integrity:</strong> We maintain high ethical standards in all our actions and relationships.</li>
                      <li><strong>Respect:</strong> We honor the dignity and worth of every individual.</li>
                      <li><strong>Excellence:</strong> We strive for quality in our ritual work and all Lodge activities.</li>
                      <li><strong>Education:</strong> We promote continuous learning and self-improvement.</li>
                      <li><strong>Service:</strong> We dedicate ourselves to serving our community and making a positive difference.</li>
                      <li><strong>Tradition:</strong> We honor and preserve the rich heritage of Freemasonry.</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'meetings' && (
                  <div>
                    <p className="lead text-xl">St. Petersburg Lodge No. 139 holds regular meetings that provide opportunities for fraternal fellowship, Masonic education, and the transaction of Lodge business.</p>
                    
                    <div className="my-8 bg-neutral-light p-6 rounded-lg shadow-md">
                      <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-4">Regular Communications</h3>
                      <div className="flex items-start mb-4">
                        <Clock className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">3rd Tuesday of each month</p>
                          <p>Dinner at 6:30 PM | Meeting at 7:30 PM</p>
                        </div>
                      </div>
                      <p>Our stated communications include Lodge business, Masonic education, and fraternal fellowship. All Master Masons in good standing are welcome to attend.</p>
                    </div>
                    
                    <h2 className="font-cinzel text-2xl text-primary-blue font-bold mt-8 mb-4">Upcoming Special Events</h2>
                    <p>In addition to our regular meetings, we host special events throughout the year, including:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Degree conferrals</li>
                      <li>Lodge anniversaries and celebrations</li>
                      <li>Educational workshops and seminars</li>
                      <li>Family events and open houses</li>
                      <li>Charitable activities</li>
                    </ul>
                    <p className="mt-4">For a complete schedule of upcoming events, please visit our <Link to="/calendar"><span className="text-primary-blue font-medium hover:text-primary-gold">Calendar</span></Link> page.</p>
                    
                    <div className="my-8 p-6 border border-primary-gold rounded-lg">
                      <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-4">Visitor Information</h3>
                      <p>Visiting Masons from other jurisdictions are always welcome at our meetings. Please bring your dues card or other proof of membership. If you are planning to visit our Lodge, we recommend contacting our Secretary in advance.</p>
                      <div className="mt-4">
                        <Link to="/contact">
                          <div className="inline-flex items-center text-primary-blue hover:text-primary-gold font-semibold transition">
                            <span>Contact our Secretary</span>
                            <ChevronRight className="ml-2 h-5 w-5" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full lg:w-1/3">
              {/* Lodge Information Sidebar */}
              <div className="bg-neutral-light p-6 rounded-lg shadow-md mb-8">
                <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-4">Lodge Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Lodge Location</p>
                      <p>3325 1st St NE</p>
                      <p>St. Petersburg, FL 33704</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p>(727) 321-1739</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p>secretary@stpetelodge139.org</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-primary-gold mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Regular Meetings</p>
                      <p>3rd Tuesday of each month</p>
                      <p>Dinner: 6:30 PM | Meeting: 7:30 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <a 
                    href="https://maps.google.com/?q=3325+1st+St+NE,+St.+Petersburg,+FL+33704" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-blue hover:text-primary-gold font-semibold transition"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-md">
                <h3 className="font-cinzel text-xl text-primary-blue font-bold p-6 border-b">Quick Links</h3>
                <div className="divide-y">
                  <Link to="/officers">
                    <div className="p-4 hover:bg-neutral-light transition">
                      <div className="flex items-center justify-between">
                        <span>Current Officers</span>
                        <ChevronRight className="h-4 w-4 text-primary-gold" />
                      </div>
                    </div>
                  </Link>
                  <Link to="/history">
                    <div className="p-4 hover:bg-neutral-light transition">
                      <div className="flex items-center justify-between">
                        <span>Lodge History</span>
                        <ChevronRight className="h-4 w-4 text-primary-gold" />
                      </div>
                    </div>
                  </Link>
                  <Link to="/past-masters">
                    <div className="p-4 hover:bg-neutral-light transition">
                      <div className="flex items-center justify-between">
                        <span>Past Masters</span>
                        <ChevronRight className="h-4 w-4 text-primary-gold" />
                      </div>
                    </div>
                  </Link>
                  <Link to="/becoming-mason">
                    <div className="p-4 hover:bg-neutral-light transition">
                      <div className="flex items-center justify-between">
                        <span>Become a Mason</span>
                        <ChevronRight className="h-4 w-4 text-primary-gold" />
                      </div>
                    </div>
                  </Link>
                  <Link to="/forms">
                    <div className="p-4 hover:bg-neutral-light transition">
                      <div className="flex items-center justify-between">
                        <span>Forms & Petitions</span>
                        <ChevronRight className="h-4 w-4 text-primary-gold" />
                      </div>
                    </div>
                  </Link>
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

export default About;