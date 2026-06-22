import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  return (
    <footer className="bg-brand-dark-blue text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-brand-red">Job Seekers</h3>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/jobs" className="text-base text-gray-300 hover:text-white">Search Jobs</NavLink></li>
              <li><NavLink to="/profile" className="text-base text-gray-300 hover:text-white">Create Account</NavLink></li>
              <li><NavLink to="/applications" className="text-base text-gray-300 hover:text-white">Application Status</NavLink></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Career Resources</a></li>
              <li><NavLink to="/profile" className="text-base text-gray-300 hover:text-white">Veterans Preference</NavLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">Agencies</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Post Jobs</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Manage Postings</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Recruitment Tools</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Agency Resources</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-brand-blue">Help & Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Technical Support</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Accessibility</a></li>
              <li><a href="#" className="text-base text-gray-300 hover:text-white">Site Map</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase">
                <span className="text-brand-red">L</span>
                <span className="text-white">E</span>
                <span className="text-brand-blue">G</span>
                <span className="text-brand-red">A</span>
                <span className="text-white">L</span>
            </h3>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/privacy-policy" className="text-base text-gray-300 hover:text-white">Privacy Policy</NavLink></li>
              <li><NavLink to="/terms-of-use" className="text-base text-gray-300 hover:text-white">Terms of Use</NavLink></li>
              <li><NavLink to="/foia" className="text-base text-gray-300 hover:text-white">FOIA</NavLink></li>
              <li><NavLink to="/no-fear-act" className="text-base text-gray-300 hover:text-white">No FEAR Act</NavLink></li>
              <li><NavLink to="/equal-opportunity" className="text-base text-gray-300 hover:text-white">Equal Opportunity</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
                 <div className="flex items-center justify-center bg-white p-1.5 rounded-full">
                   <svg className="h-7 w-7 text-brand-blue" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L1 9l4 2.18v6.32L12 22l7-4.5V11.18L23 9l-11-7zM12 4.41L19.44 9 12 12.59 4.56 9 12 4.41zM6 12.32l5 2.72v4.48l-5-2.72v-4.48z"/>
                    </svg>
                </div>
                <div>
                    <p className="text-base font-bold text-white">USAJOBS</p>
                    <p className="text-sm text-gray-400">Official Federal Jobs Portal</p>
                </div>
            </div>
          <div className="flex flex-col items-end">
             <p className="mt-4 md:mt-0 text-base text-gray-400">&copy; 2026 United States Government</p>
             <p className="text-sm text-gray-500 mt-1">Last Updated on: {today}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
