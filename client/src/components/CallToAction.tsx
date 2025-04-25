import React from 'react';
import { Link } from 'wouter';

const CallToAction: React.FC = () => {
  return (
    <section className="py-12 bg-primary-gold">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="font-cinzel text-2xl md:text-3xl text-primary-blue-darker font-bold">
              Ready to Experience Freemasonry?
            </h3>
            <p className="text-primary-blue-darker mt-2">
              Begin your journey with St. Petersburg Lodge No. 139
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/becoming-mason">
              <div className="bg-primary-blue-darker hover:bg-primary-blue text-white px-6 py-3 rounded-md transition duration-300 cursor-pointer">
                <span>Request Information</span>
              </div>
            </Link>
            <Link to="/contact">
              <div className="bg-white hover:bg-gray-100 text-primary-blue-darker px-6 py-3 rounded-md transition duration-300 border border-primary-blue-darker cursor-pointer">
                <span>Contact Us</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
