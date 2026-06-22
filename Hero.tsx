
import React from 'react';
import { SearchIcon, LocationIcon } from './icons';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-900 text-white py-20 md:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wavy-lines.png')" }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="flex justify-center items-center mb-4 space-x-4">
            <div className="h-1 w-12 bg-red-500"></div>
             <div className="relative">
                <div className="w-16 h-16 bg-white rounded-md transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-md text-white flex items-center justify-center">
                         <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1.5-1.5m1.5 1.5V5.25m0 0l-1.5-1.5m1.5 1.5l1.5-1.5" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="h-1 w-12 bg-white"></div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          NATIONAL UNIFIED JOB <br className="hidden sm:block" /> APPLICATION PORTAL
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-indigo-200">
          Your gateway to federal and private employment opportunities across the United States
        </p>
        
        <div className="mt-10 max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-4 flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-2/5 flex items-center border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4">
            <SearchIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search Jobs" 
              className="w-full border-none focus:ring-0 text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="w-full md:w-2/5 flex items-center border-b md:border-b-0 md:border-r border-gray-200 pb-2 md:pb-0 md:pr-4">
            <LocationIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Location" 
              className="w-full border-none focus:ring-0 text-gray-800 placeholder-gray-500"
            />
          </div>
          <button className="w-full md:w-1/5 bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition-colors flex items-center justify-center">
            <SearchIcon className="h-5 w-5 mr-2 md:hidden" />
            Search
          </button>
        </div>
        <div className="mt-4 text-sm text-indigo-200">
          Popular searches: 
          <a href="#" className="underline hover:text-white ml-2">Administrative</a>, 
          <a href="#" className="underline hover:text-white ml-2">IT Specialist</a>, 
          <a href="#" className="underline hover:text-white ml-2">Analyst</a>, 
          <a href="#" className="underline hover:text-white ml-2">Engineer</a>, 
          <a href="#" className="underline hover:text-white ml-2">Nurse</a>
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-brand-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors w-full sm:w-auto">
                APPLY NOW
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-3 px-8 rounded-md transition-colors w-full sm:w-auto">
                LOGIN / SIGN UP
            </button>
        </div>
        <p className="mt-10 text-lg font-semibold tracking-widest uppercase text-indigo-300 opacity-50">United States of America</p>

      </div>
    </div>
  );
};

export default Hero;
