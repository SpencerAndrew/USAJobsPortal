
import React from 'react';
import { jobs } from '../constants';
import { Job, JobSector } from '../types';
import { BookmarkIcon, BuildingOfficeIcon, LocationIcon } from './icons';
import { Link } from 'react-router-dom';

const JobCard: React.FC<{ job: Job }> = ({ job }) => {
  const isGovernment = job.sector === JobSector.Government;
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
          <p className="text-brand-blue font-semibold mt-1">
            {isGovernment ? job.agency : job.company}
          </p>
        </div>
        {job.companyLogo && (
          <img src={job.companyLogo} alt={`${job.company} logo`} className="h-10 w-10 object-contain"/>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-600 space-y-2">
        <div className="flex items-center">
            <LocationIcon className="h-4 w-4 mr-2 text-gray-400"/>
            <span>{job.location}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
                <p className="font-semibold text-gray-800">Salary:</p>
                <p className="text-green-600 font-medium">{job.salary}</p>
            </div>
             <div>
                <p className="font-semibold text-gray-800">Type:</p>
                <p>{job.type}</p>
            </div>
             <div>
                <p className="font-semibold text-gray-800">Security:</p>
                <p className="text-red-600 font-medium">{job.securityClearance}</p>
            </div>
             <div>
                <p className="font-semibold text-gray-800">Deadline:</p>
                <p className="text-red-600 font-medium">{job.deadline}</p>
            </div>
        </div>
      </div>
      
      <div className="mt-auto pt-4 flex justify-between items-center">
        <Link to={`/apply/${job.id}`} className="w-full text-center bg-brand-blue text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          View Details
        </Link>
        <button className="ml-2 text-gray-400 hover:text-brand-blue p-2 rounded-full">
            <BookmarkIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const FeaturedJobs: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center text-gray-800">Featured Positions</h2>
      <p className="mt-2 text-center text-gray-600">Discover high-demand opportunities across federal and private sectors. New positions added daily.</p>
      <p className="mt-2 text-center text-sm text-gray-500 italic">Please note: The job listings displayed here are for demonstration purposes only and do not represent real-time openings.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.slice(0, 6).map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedJobs;
