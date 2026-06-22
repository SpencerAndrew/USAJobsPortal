import React from 'react';
import { agencies } from '../constants';
import { Agency } from '../types';
import { BriefcaseIcon } from './icons';

const AgencyCard: React.FC<{ agency: Agency }> = ({ agency }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
    <div className="bg-brand-blue text-white rounded-full h-16 w-16 flex items-center justify-center font-bold text-xl">
      {agency.abbr}
    </div>
    <h3 className="mt-4 font-bold text-gray-800">{agency.name}</h3>
    <div className="mt-2 text-sm text-gray-500 flex items-center">
      <BriefcaseIcon className="h-4 w-4 mr-1.5" />
      <span>{agency.openPositions.toLocaleString()} open positions</span>
    </div>
  </div>
);

const AgencyPartners: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center text-gray-800">Federal Agency Partners</h2>
      <p className="mt-2 text-center text-gray-600">Explore opportunities across all major federal departments and agencies.</p>
      <p className="mt-2 text-center text-sm text-gray-500 italic">Please note: Agency data and open position counts are for illustrative purposes and are not updated in real-time.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {agencies.map(agency => (
          <AgencyCard key={agency.abbr} agency={agency} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-2">Can't find your preferred agency? We work with over 100+ federal departments and independent agencies.</p>
        <a href="#" className="text-brand-blue font-semibold hover:underline">
          View Complete Agency Directory &rarr;
        </a>
      </div>
    </section>
  );
};

export default AgencyPartners;
