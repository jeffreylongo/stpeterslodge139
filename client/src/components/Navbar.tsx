import React, { useState } from 'react';
import { Link } from 'wouter';
import LodgeEmblem from './LodgeEmblem';
import { Menu, ChevronDown, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-primary-blue-darker">
      {/* Top Banner */}
      <div className="bg-primary-gold text-primary-blue-darker text-center py-1 px-4 text-sm font-semibold">
        <span>Stated Communication: Third Tuesday of Each Month at 7:30 PM | Dinner at 6:30 PM</span>
      </div>
      
      {/* Logo and Navigation */}
      <div className="container mx-auto px-3 md:px-4 py-2 md:py-3 flex flex-col md:flex-row items-center justify-between">
        {/* Logo Section - 3 Column Layout on Mobile with larger middle column */}
        <div className="w-full grid grid-cols-5 items-center md:flex md:justify-start">
          {/* Column 1: Logo - 1/5 width */}
          <div className="flex justify-start items-center">
            <Link to="/">
              <div className="h-10 w-10 md:h-24 md:w-auto flex-shrink-0">
                <LodgeEmblem />
              </div>
            </Link>
          </div>
          
          {/* Column 2: Lodge Name - 3/5 width */}
          <div className="col-span-3 text-white text-center overflow-hidden px-1 md:text-left md:ml-3">
            <h1 className="font-cinzel text-base md:text-xl lg:text-2xl font-bold tracking-wide truncate whitespace-nowrap">St. Petersburg</h1>
            <p className="font-garamond text-primary-gold text-base md:text-sm italic">Lodge No. 139 F&AM</p>
          </div>
          
          {/* Column 3: Menu Button - 1/5 width */}
          <div className="flex justify-end">
            <button 
              onClick={toggleMenu}
              className="md:hidden bg-primary-blue text-white p-1.5 rounded-md flex items-center text-sm"
            >
              <span className="mr-1.5">Menu</span>
              {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
          
        {/* Navigation */}
        <nav className="w-full md:w-auto">
          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-sm font-medium w-full md:w-auto bg-primary-blue md:bg-transparent mt-2 md:mt-0 rounded overflow-hidden`}>
            {/* About Dropdown with shadcn DropdownMenu */}
            <li className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="text-white hover:text-primary-gold focus:text-primary-gold focus:outline-none w-full text-left px-4 py-3 md:py-2 transition flex items-center justify-between">
                    <span>ABOUT</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="bg-primary-blue-dark border border-primary-gold z-[100] min-w-[200px]">
                  <Link to="/about-139">
                    <DropdownMenuItem className="text-white hover:text-primary-gold hover:bg-primary-blue focus:bg-primary-blue focus:text-primary-gold cursor-pointer">
                      About Our Lodge
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/history">
                    <DropdownMenuItem className="text-white hover:text-primary-gold hover:bg-primary-blue focus:bg-primary-blue focus:text-primary-gold cursor-pointer">
                      Our History
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/officers">
                    <DropdownMenuItem className="text-white hover:text-primary-gold hover:bg-primary-blue focus:bg-primary-blue focus:text-primary-gold cursor-pointer">
                      Officers
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/past-masters">
                    <DropdownMenuItem className="text-white hover:text-primary-gold hover:bg-primary-blue focus:bg-primary-blue focus:text-primary-gold cursor-pointer">
                      Past Masters
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/becoming-mason">
                    <DropdownMenuItem className="text-white hover:text-primary-gold hover:bg-primary-blue focus:bg-primary-blue focus:text-primary-gold cursor-pointer">
                      Become a Mason
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/forms">
                    <DropdownMenuItem className="text-white hover:text-primary-gold hover:bg-primary-blue focus:bg-primary-blue focus:text-primary-gold cursor-pointer">
                      Forms & Petitions
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            
            {/* Regular Links */}
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

export default Navbar;