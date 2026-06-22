
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BellIcon, UserIcon } from './icons';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-blue-700 text-white' : 'text-white hover:bg-blue-600'
    }`;

  return (
    <header className="bg-brand-dark-blue shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT GROUP */}
          <div className="flex items-center flex-shrink-0">
            <div className="flex-shrink-0">
               <NavLink to="/" className="flex items-center space-x-2 text-white">
                    <div className="flex items-center justify-center bg-white p-1 rounded">
                       <svg className="h-6 w-6 text-brand-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L1 9l4 2.18v6.32L12 22l7-4.5V11.18L23 9l-11-7zM12 4.41L19.44 9 12 12.59 4.56 9 12 4.41zM6 12.32l5 2.72v4.48l-5-2.72v-4.48z"/>
                        </svg>
                    </div>
                    <div>
                         <span className="font-bold text-lg">USAJobs Portal</span>
                         <p className="text-xs text-gray-300">National Employment Gateway</p>
                    </div>
                </NavLink>
            </div>
            <div className="hidden md:block ml-10">
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
            </div>
          </div>

          {/* CENTER GROUP */}
          <nav className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <NavLink to="/jobs" className={navLinkClass}>Browse Jobs</NavLink>
              <NavLink to="/applications" className={navLinkClass}>My Applications</NavLink>
              <NavLink to="/profile" className={navLinkClass}>My Profile</NavLink>
              <NavLink to="/tax-documents" className={navLinkClass}>Tax Documents</NavLink>
              <NavLink to="/shutdowns" className={navLinkClass}>Gov Shutdowns</NavLink>
            </div>
          </nav>

          {/* RIGHT GROUP */}
          <div className="hidden md:flex items-center space-x-6 flex-shrink-0">
            <button className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap">
              <BellIcon className="h-5 w-5 mr-2" />
              Alerts
            </button>
            <button className="flex items-center bg-brand-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm whitespace-nowrap">
              <UserIcon className="h-5 w-5 mr-2" />
              Sign In
            </button>
          </div>
          
          {/* MOBILE HAMBURGER */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={navLinkClass + " block"}>Home</NavLink>
            <NavLink to="/jobs" className={navLinkClass + " block"}>Browse Jobs</NavLink>
            <NavLink to="/applications" className={navLinkClass + " block"}>My Applications</NavLink>
            <NavLink to="/profile" className={navLinkClass + " block"}>My Profile</NavLink>
            <NavLink to="/tax-documents" className={navLinkClass + " block"}>Tax Documents</NavLink>
            <NavLink to="/shutdowns" className={navLinkClass + " block"}>Gov Shutdowns</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
