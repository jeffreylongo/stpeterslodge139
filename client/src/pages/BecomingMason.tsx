import { Link } from 'wouter';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import { ChevronRight, FileText, Users, Book, MessageSquare, Calendar, Award } from 'lucide-react';

const BecomingMason = () => {
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
              <Link to="/about-139">
                <div className="hover:text-primary-gold transition">Our Lodge</div>
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-gold">Becoming a Mason</span>
            </div>
            <h1 className="font-cinzel text-4xl md:text-5xl font-bold">How to Become a Mason</h1>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none mb-12">
              <p className="lead text-xl">Freemasonry is a fraternal organization that welcomes men of good character who desire to improve themselves morally and intellectually while contributing to the betterment of their communities.</p>
              
              <p>Becoming a Freemason is a decision that should be made thoughtfully. Our organization has a rich history spanning centuries, with traditions and values that continue to resonate in today's world. If you're interested in joining, here's what you should know about the process.</p>
            </div>
            
            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-6">Requirements to Join</h2>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="text-primary-gold mr-4 mt-1">✓</div>
                  <div>
                    <p className="font-medium">Be a man at least 18 years of age</p>
                    <p className="text-gray-600">Freemasonry is a fraternal organization for men.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-primary-gold mr-4 mt-1">✓</div>
                  <div>
                    <p className="font-medium">Belief in a Supreme Being</p>
                    <p className="text-gray-600">Freemasonry is not a religion, but members must profess belief in a Supreme Being according to their own understanding.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-primary-gold mr-4 mt-1">✓</div>
                  <div>
                    <p className="font-medium">Good moral character</p>
                    <p className="text-gray-600">Applicants should be of good reputation and possess a desire for moral and intellectual improvement.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-primary-gold mr-4 mt-1">✓</div>
                  <div>
                    <p className="font-medium">Join of your own free will</p>
                    <p className="text-gray-600">The decision to become a Mason must be your own, without pressure or undue influence.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="text-primary-gold mr-4 mt-1">✓</div>
                  <div>
                    <p className="font-medium">Residence requirement</p>
                    <p className="text-gray-600">Applicants must have established residence in Florida for at least six months prior to petitioning.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Application Process */}
            <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-6">The Path to Becoming a Mason</h2>
            
            <div className="space-y-8 mb-12">
              <div className="bg-neutral-light p-6 rounded-lg shadow-md flex">
                <div className="mr-6 flex items-center justify-center w-12 h-12 bg-primary-blue rounded-full flex-shrink-0">
                  <MessageSquare className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">1. Express Interest</h3>
                  <p>Start by reaching out to our lodge. You can do this by contacting us through our website, attending an open event, or speaking with a Mason you know. We welcome the opportunity to answer your questions about Freemasonry.</p>
                  <div className="mt-4">
                    <Link to="/contact">
                      <div className="text-primary-blue hover:text-primary-gold font-medium transition">Contact us with your interest</div>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-light p-6 rounded-lg shadow-md flex">
                <div className="mr-6 flex items-center justify-center w-12 h-12 bg-primary-blue rounded-full flex-shrink-0">
                  <Users className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">2. Meet the Brethren</h3>
                  <p>Visit our lodge to meet the members and learn more about our activities. This gives you a chance to get to know us, and for us to get to know you. Many lodges host informal dinners before meetings where visitors are welcome.</p>
                </div>
              </div>
              
              <div className="bg-neutral-light p-6 rounded-lg shadow-md flex">
                <div className="mr-6 flex items-center justify-center w-12 h-12 bg-primary-blue rounded-full flex-shrink-0">
                  <FileText className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">3. Submit a Petition</h3>
                  <p>If you decide to join, you'll need to complete a petition form. Your petition must be signed by two Master Masons who will serve as your sponsors. If you don't know any Masons, we can help you meet members who might serve as sponsors after getting to know you.</p>
                  <div className="mt-4">
                    <Link to="/forms">
                      <div className="text-primary-blue hover:text-primary-gold font-medium transition">View petition forms</div>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-light p-6 rounded-lg shadow-md flex">
                <div className="mr-6 flex items-center justify-center w-12 h-12 bg-primary-blue rounded-full flex-shrink-0">
                  <Book className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">4. Investigation and Ballot</h3>
                  <p>After your petition is received, the lodge will appoint a committee to meet with you. This is a friendly interview to discuss your interest in Freemasonry and answer any questions you may have. Following the committee's report, the lodge members will vote on your petition.</p>
                </div>
              </div>
              
              <div className="bg-neutral-light p-6 rounded-lg shadow-md flex">
                <div className="mr-6 flex items-center justify-center w-12 h-12 bg-primary-blue rounded-full flex-shrink-0">
                  <Calendar className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">5. Receive the Degrees</h3>
                  <p>If approved, you will receive the three degrees of Freemasonry: Entered Apprentice, Fellow Craft, and Master Mason. Each degree is a ceremony that uses symbols and allegory to teach moral and philosophical lessons.</p>
                </div>
              </div>
              
              <div className="bg-neutral-light p-6 rounded-lg shadow-md flex">
                <div className="mr-6 flex items-center justify-center w-12 h-12 bg-primary-blue rounded-full flex-shrink-0">
                  <Award className="text-white h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">6. Participate as a Mason</h3>
                  <p>After receiving the Master Mason degree, you will be a full member of the lodge with all the rights and responsibilities that entails. You'll be encouraged to attend meetings, participate in activities, and begin your journey of Masonic education.</p>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-12">
              <h2 className="font-cinzel text-2xl text-primary-blue font-bold mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-xl">What is Freemasonry?</h3>
                  <p className="mt-2">Freemasonry is a fraternal organization that promotes moral and personal development among its members. It is one of the world's oldest secular fraternities, with a rich tradition of philosophical and charitable activities.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl">Is Freemasonry a religion?</h3>
                  <p className="mt-2">No, Freemasonry is not a religion, nor is it a substitute for religion. While members must believe in a Supreme Being, Freemasonry does not dictate how a member should practice his faith. Men of many different faiths belong to the fraternity.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl">How much time does Freemasonry require?</h3>
                  <p className="mt-2">Our lodge typically meets twice a month, and there may be additional educational or social events. The amount of time you dedicate to Masonry is ultimately up to you, based on your interests and availability.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl">What are the costs involved?</h3>
                  <p className="mt-2">There is an initiation fee to join, and annual dues thereafter. The exact amounts vary by lodge. These fees support the operation of the lodge and its charitable activities. Additional information about current dues can be provided upon request.</p>
                </div>
                
                <div>
                  <h3 className="font-bold text-xl">Do I need to be invited to join?</h3>
                  <p className="mt-2">No. Traditionally, Masons do not recruit members, but that doesn't mean you need a formal invitation. If you are interested, you should express that interest to a Mason or directly to a lodge.</p>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="bg-primary-blue text-white p-8 rounded-lg text-center">
              <h2 className="font-cinzel text-2xl font-bold mb-4">Ready to Take the Next Step?</h2>
              <p className="text-lg mb-6">If you're interested in learning more about Freemasonry or beginning the process of becoming a Mason, we invite you to contact us.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <div className="bg-white text-primary-blue hover:bg-primary-gold hover:text-white px-6 py-3 rounded font-semibold transition">
                    Contact Us
                  </div>
                </Link>
                <Link to="/forms">
                  <div className="bg-primary-gold text-primary-blue hover:bg-primary-gold-light px-6 py-3 rounded font-semibold transition">
                    View Petition Forms
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BecomingMason;