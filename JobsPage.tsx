
import React from 'react';
import { jobs } from '../constants';
import { Job, JobSector } from '../types';
import { BookmarkIcon, LocationIcon, SearchIcon } from '../components/icons';
import { Link } from 'react-router-dom';

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const isGovernment = job.sector === JobSector.Government;
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col border">
        <div className="flex justify-between items-start">
            <div>
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isGovernment ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {job.sector}
                    </span>
                    {job.payGrade && (
                        <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">{job.payGrade}</span>
                    )}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mt-2">{job.title}</h3>
                <p className="text-brand-blue font-semibold mt-1">
                    {isGovernment ? job.agency : job.company}
                </p>
            </div>
            {job.companyLogo && (
            <img src={job.companyLogo} alt={`${job.company} logo`} className="h-12 w-12 object-contain"/>
            )}
        </div>
        
        <div className="mt-4 text-sm text-gray-600 space-y-2">
            <div className="flex items-center">
                <LocationIcon className="h-4 w-4 mr-2 text-gray-400"/>
                <span>{job.location}</span>
            </div>
            <p className="text-green-600 font-medium">{job.salary}</p>
            <p><span className="font-semibold">Type:</span> {job.type}</p>
            <p><span className="font-semibold">Security:</span> <span className="text-red-600">{job.securityClearance}</span></p>
        </div>
        
        <div className="mt-auto pt-4 flex justify-between items-center text-sm text-gray-500">
            <span>{job.applicants} applicants</span>
            <span>Deadline: {job.deadline}</span>
        </div>
        
        <div className="mt-4 flex gap-2">
            <Link to={`/apply/${job.id}`} className="flex-grow text-center bg-brand-blue text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
            Apply Now
            </Link>
            <button className="text-gray-400 hover:text-brand-blue p-2 border rounded-md">
                <BookmarkIcon className="h-6 w-6" />
            </button>
        </div>
    </div>
  );
};

const JobsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Job Listings</h1>
        <p className="text-gray-600 mb-8">Search and filter through thousands of government and private sector jobs.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Column */}
          <aside className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Sector</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>All Sectors</option>
                  <option>Government</option>
                  <option>Private</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pay Grade (GS)</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Any</option>
                  <option>GS-9</option>
                  <option>GS-11</option>
                  <option>GS-12</option>
                  <option>GS-13</option>
                  <option>GS-14</option>
                  <option>GS-15</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Security Clearance</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option>Any</option>
                  <option>None Required</option>
                  <option>Public Trust</option>
                  <option>Secret</option>
                  <option>Top Secret</option>
                  <option>Top Secret/SCI</option>
                </select>
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700">Job Type</label>
                 <div className="mt-2 space-y-2">
                    <label className="flex items-center"><input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/> <span className="ml-2 text-sm">Full-time</span></label>
                    <label className="flex items-center"><input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/> <span className="ml-2 text-sm">Part-time</span></label>
                    <label className="flex items-center"><input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/> <span className="ml-2 text-sm">Contract</span></label>
                 </div>
              </div>
              <button className="w-full bg-brand-blue text-white py-2 px-4 rounded-md hover:bg-blue-700">Apply Filters</button>
            </div>
          </aside>
          
          {/* Jobs List Column */}
          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
