import React, { useState } from 'react';
import { Link } from 'wouter';
import LodgeEmblem from './LodgeEmblem';
import { Menu, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  
  const toggleAboutDropdown = () => {
    setIsAboutOpen(prev => !prev);
  };
  
  return (
    <header className="bg-primary-blue-darker">
      {/* Top Banner */}
      <div className="bg-primary-gold text-primary-blue-darker text-center py-1 px-4 text-sm font-semibold">
        <span>Next Stated Communication: Third Tuesday of the Month at 7:30 PM</span>
      </div>
      
      {/* Logo and Navigation */}
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        {/* Logo Section */}
        <Link to="/">
          <div className="flex items-center mb-4 md:mb-0 cursor-pointer">
            <div className="h-24 mr-4">
              <LodgeEmblem />
            </div>
            <div className="text-white">
              <h1 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide">St. Petersburg Lodge No. 139</h1>
              <p className="font-garamond text-primary-gold text-sm sm:text-base italic">Free & Accepted Masons</p>
            </div>
          </div>
        </Link>
        
        {/* Navigation */}
        <nav className="w-full md:w-auto">
          <button 
            onClick={toggleMenu}
            className="md:hidden bg-primary-blue text-white p-2 rounded w-full flex justify-between items-center"
          >
            <span>Menu</span>
            <Menu size={18} />
          </button>
          
          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-sm font-medium w-full md:w-auto bg-primary-blue md:bg-transparent mt-2 md:mt-0 rounded overflow-hidden`}>
            <li className="relative">
              <div 
                className="text-white hover:text-primary-gold block px-4 py-3 md:py-2 transition flex items-center justify-between cursor-pointer"
                onClick={toggleAboutDropdown}
              >
                <span>ABOUT</span>
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              </div>
              {isAboutOpen && (
                <ul className="absolute left-0 w-48 bg-primary-blue-dark shadow-lg rounded overflow-hidden z-10">
                  <li>
                    <Link to="/about-139">
                      <div className="text-white hover:text-primary-gold block px-4 py-2">About Our Lodge</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/history">
                      <div className="text-white hover:text-primary-gold block px-4 py-2">Our History</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/officers">
                      <div className="text-white hover:text-primary-gold block px-4 py-2">Officers</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/past-masters">
                      <div className="text-white hover:text-primary-gold block px-4 py-2">Past Masters</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/becoming-mason">
                      <div className="text-white hover:text-primary-gold block px-4 py-2">Become a Mason</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="/forms">
                      <div className="text-white hover:text-primary-gold block px-4 py-2">Forms & Petitions</div>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/calendar">
                <div className="text-white hover:text-primary-gold block px-4 py-3 md:py-2 transition">CALENDAR</div>
              </Link>
            </li>
            <li>
              <Link to="/members">
                <div className="text-white hover:text-primary-gold block px-4 py-3 md:py-2 transition">MEMBERS</div>
              </Link>
            </li>
            <li>
              <Link to="/shop">
                <div className="text-white hover:text-primary-gold block px-4 py-3 md:py-2 transition">SHOP</div>
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <div className="text-white hover:text-primary-gold block px-4 py-3 md:py-2 transition">CONTACT</div>
              </Link>
            </li>
            <li className="md:ml-2">
              <Link to="/login">
                <div className="bg-primary-gold text-primary-blue-darker hover:bg-primary-gold-light block px-4 py-3 md:py-2 rounded font-semibold transition">MEMBER LOGIN</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
