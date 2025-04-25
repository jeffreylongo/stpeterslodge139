import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Calendar } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://cdn.pixabay.com/photo/2013/07/13/01/09/temple-155741_1280.jpg')",
          filter: "brightness(0.3)" 
        }}
      />
      
      <div className="absolute inset-0 bg-primary-blue-darker bg-opacity-60"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-cinzel text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-6">
            Freemasonry in St. Petersburg Since 1894
          </h1>
          <p className="text-white text-lg md:text-xl mb-8 font-garamond leading-relaxed">
            A fraternal organization dedicated to the Brotherhood of Man under the Fatherhood of God. 
            We strive to make good men better through moral teachings, charitable works, and fellowship.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/about-freemasonry">
              <div className="bg-primary-gold hover:bg-primary-gold-light text-primary-blue-darker font-semibold px-6 py-3 rounded-md transition duration-300 inline-flex items-center cursor-pointer">
                <span>Learn About Freemasonry</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </Link>
            
            <Link to="/calendar">
              <div className="border-2 border-white hover:border-primary-gold text-white hover:text-primary-gold px-6 py-3 rounded-md transition duration-300 inline-flex items-center cursor-pointer">
                <span>Calendar of Events</span>
                <Calendar className="ml-2 h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-primary-blue-darker to-transparent"></div>
    </section>
  );
};

export default Hero;
