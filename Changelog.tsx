
import React, { useState } from 'react';
import { changelogItems } from '../constants';
import { ChangelogItem, UpdateType } from '../types';
import { PlusCircleIcon, ArrowUpCircleIcon, WrenchScrewdriverIcon, ShieldCheckIcon, CalendarIcon } from './icons';

const updateTypeStyles = {
    [UpdateType.Feature]: {
        icon: PlusCircleIcon,
        color: 'green',
        badge: 'bg-green-100 text-green-800',
    },
    [UpdateType.Improvement]: {
        icon: ArrowUpCircleIcon,
        color: 'blue',
        badge: 'bg-blue-100 text-blue-800',
    },
    [UpdateType.Fix]: {
        icon: WrenchScrewdriverIcon,
        color: 'orange',
        badge: 'bg-orange-100 text-orange-800',
    },
    [UpdateType.Security]: {
        icon: ShieldCheckIcon,
        color: 'red',
        badge: 'bg-red-100 text-red-800',
    },
};

const ChangelogEntry: React.FC<{ item: ChangelogItem }> = ({ item }) => {
    const { icon: Icon, color, badge } = updateTypeStyles[item.type];

    return (
        <div className="flex space-x-4">
            <div className={`text-${color}-500 mt-1`}>
                <Icon className="h-6 w-6"/>
            </div>
            <div>
                <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-gray-800">{item.title}</h3>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${badge}`}>{item.type}</span>
                </div>
                <p className="mt-1 text-gray-600">{item.description}</p>
                <div className="mt-2 text-sm text-gray-400 flex items-center space-x-4">
                   <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1.5" />
                        <span>{item.date}</span>
                   </div>
                   <div className="flex items-center">
                        <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h2zm0 0v11m0-11h10m-10 11h10m0 0v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m0 0h5" /></svg>
                        <span>Version {item.version}</span>
                   </div>
                </div>
            </div>
        </div>
    );
};

const Changelog: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const itemsToShow = showAll ? changelogItems : changelogItems.slice(0, 5);

  return (
    <section>
      <h2 className="text-3xl font-bold text-center text-gray-800">Website Changelog</h2>
      <p className="mt-2 text-center text-gray-600">Stay updated with the latest improvements, features, and fixes to the USAJOBS portal.</p>
      
      <div className="mt-8 max-w-3xl mx-auto space-y-8">
        {itemsToShow.map(item => (
            <div key={item.version} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                 <ChangelogEntry item={item} />
            </div>
        ))}
      </div>
      
      {changelogItems.length > 5 && (
        <div className="mt-8 text-center">
          <button onClick={() => setShowAll(!showAll)} className="bg-brand-blue text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            {showAll ? 'View Less Updates' : `View All Updates (${changelogItems.length - 5} more)`}
          </button>
        </div>
      )}
      
      <div className="mt-12 max-w-3xl mx-auto bg-blue-50 p-6 rounded-lg text-center">
        <h3 className="font-bold text-lg text-gray-800">Stay Updated</h3>
        <p className="mt-2 text-gray-600">Want to be notified about new features and improvements? Subscribe to our updates.</p>
        <div className="mt-4">
          <button className="bg-brand-blue text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Subscribe to Updates
          </button>
        </div>
      </div>
    </section>
  );
};

export default Changelog;
