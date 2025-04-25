import React from 'react';
import { Link } from 'wouter';
import { HelpCircle, Handshake, Mail, ArrowRight, Send } from 'lucide-react';

interface InfoCard {
  icon: React.ElementType;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

const BecomingMason: React.FC = () => {
  const infoCards: InfoCard[] = [
    {
      icon: HelpCircle,
      title: "What is Freemasonry?",
      description: "Freemasonry is a fraternal organization that promotes brotherhood, charity, and truth. The United Grand Lodge of England describes it as a society that unites men of integrity, goodwill, and character, regardless of their religious or political views.",
      linkText: "Learn More",
      linkUrl: "/what-is-freemasonry"
    },
    {
      icon: Handshake,
      title: "How to Join",
      description: "The path to membership begins with \"asking\" a Mason. If you don't know a Mason, contact our lodge directly and we'll guide you through the process.",
      linkText: "Membership Process",
      linkUrl: "/membership-process"
    },
    {
      icon: Mail,
      title: "Contact Us",
      description: "Have questions about Freemasonry or our lodge? We're happy to help. Reach out to us through our contact form or email us directly.",
      linkText: "Get in Touch",
      linkUrl: "/contact"
    }
  ];
  
  return (
    <section className="py-20 relative">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')",
          filter: "brightness(0.3)" 
        }}
      />
      
      <div className="absolute inset-0 bg-primary-blue-darker opacity-90"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-cinzel text-4xl text-white font-bold mb-4">
            Interested in Becoming a Mason?
          </h2>
          <p className="text-white text-lg mb-8">
            Freemasonry is one of the world's oldest fraternal organizations. The United Grand Lodge of England defines it as "a system of morality, veiled in allegory and illustrated by symbols." It teaches self-knowledge and promotes moral and spiritual development through participation in a progression of ceremonial dramas. Freemasons are taught its precepts by a series of ritual dramas, which follow ancient forms and use stonemasons' tools and customs as allegorical guides.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="p-6">
                  <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-cinzel text-xl text-primary-blue font-bold mb-3 text-center">
                    {card.title}
                  </h3>
                  <p className="text-center mb-6">
                    {card.description}
                  </p>
                  <div className="text-center">
                    <Link to={card.linkUrl}>
                      <div className="text-primary-blue hover:text-primary-gold inline-flex items-center justify-center font-medium transition cursor-pointer">
                        <span>{card.linkText}</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/contact">
            <div className="bg-primary-gold hover:bg-primary-gold-light text-primary-blue-darker font-semibold px-8 py-4 rounded-md transition duration-300 inline-flex items-center cursor-pointer">
              <span>Request Information</span>
              <Send className="ml-2 h-5 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BecomingMason;
