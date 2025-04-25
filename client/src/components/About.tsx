import React from 'react';
import { Link } from 'wouter';
import { ArrowRight, Square } from 'lucide-react';
import lodgeEmblem from '@assets/1000.png';

const About: React.FC = () => {
  const pillars = [
    { title: 'Brotherhood', description: 'Fellowship among men of good character' },
    { title: 'Charity', description: 'Relief to those in need through community service' },
    { title: 'Truth', description: 'Constant search for knowledge and understanding' },
    { title: 'Community', description: 'Service and involvement in local initiatives' },
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Image side */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="relative">
              <div className="bg-neutral-light p-8 rounded-lg shadow-xl">
                <img 
                  src={lodgeEmblem}
                  alt="St. Petersburg Lodge Emblem - Established 1894" 
                  className="w-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary-gold p-4 rounded shadow-lg">
                <span className="font-cinzel text-3xl font-bold text-white">1894</span>
              </div>
            </div>
          </div>
          
          {/* Text side */}
          <div className="w-full md:w-1/2">
            <h5 className="font-cinzel text-primary-gold text-lg mb-2">OUR HISTORY</h5>
            <h2 className="font-cinzel text-3xl text-primary-blue font-bold mb-6">St. Petersburg Lodge No. 139</h2>
            <p className="mb-4 leading-relaxed">
              Founded in 1894, St. Petersburg Lodge No. 139 has been an integral part of the Masonic community 
              in Pinellas County for over 125 years. Our lodge was one of the first established in the area 
              and has maintained a tradition of excellence in Masonic work and community service.
            </p>
            <p className="mb-6 leading-relaxed">
              We continue to uphold the ancient traditions and landmarks of Freemasonry while adapting to 
              the modern world. Our members come from all walks of life and backgrounds, united by a common 
              desire to become better men and to serve our community.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {pillars.map((pillar, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-primary-gold mr-3 mt-1">
                    <Square className="h-3 w-3 fill-current" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">{pillar.title}</h4>
                    <p className="text-sm text-gray-600">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/about-139">
              <div className="bg-primary-blue hover:bg-primary-blue-dark text-white px-6 py-3 rounded-md inline-flex items-center transition duration-300 cursor-pointer">
                <span>Learn More About Our Lodge</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
