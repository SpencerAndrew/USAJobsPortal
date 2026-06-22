
import React from 'react';
import Hero from '../components/Hero';
import FeaturedJobs from '../components/FeaturedJobs';
import AgencyPartners from '../components/AgencyPartners';
import ApplicationProcess from '../components/ApplicationProcess';
import Stats from '../components/Stats';
import Changelog from '../components/Changelog';
import HolidayCalendar from '../components/HolidayCalendar';
import { PlayCircleIcon } from '../components/icons';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedJobs />
        </div>
      </div>
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AgencyPartners />
        </div>
      </div>
       <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <HolidayCalendar />
        </div>
      </div>
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ApplicationProcess />
        </div>
      </div>
       <div className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-2/3">
                    <h2 className="text-3xl font-bold text-gray-800">Ready to Start Your Federal Career?</h2>
                    <p className="mt-4 text-gray-600">Join thousands of professionals who have successfully launched their careers in public service. Our platform provides all the tools and resources you need to navigate the federal hiring process.</p>
                     <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <button className="bg-brand-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                            Create Free Account
                        </button>
                        <button className="bg-white border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                            <PlayCircleIcon className="w-5 h-5 mr-2" />
                            Watch Tutorial
                        </button>
                    </div>
                </div>
                <div className="md:w-1/3 w-full mt-6 md:mt-0">
                    <img src="https://picsum.photos/500/300?grayscale" alt="Professionals in a meeting" className="rounded-lg shadow-md object-cover" />
                </div>
            </div>
        </div>
      </div>
      <Stats />
      <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Changelog />
          </div>
      </div>
    </div>
  );
};

export default HomePage;
