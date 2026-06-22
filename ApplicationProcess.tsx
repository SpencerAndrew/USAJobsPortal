
import React from 'react';
import { UserIcon, SearchIcon, DocumentTextIcon, ChartBarIcon } from './icons';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description, color }) => (
  <div className="text-center flex flex-col items-center">
    <div className={`rounded-full h-20 w-20 flex items-center justify-center text-white ${color}`}>
      {icon}
    </div>
    <h3 className="mt-4 font-bold text-lg text-gray-800">{title}</h3>
    <p className="mt-1 text-sm text-gray-600 max-w-xs">{description}</p>
  </div>
);

const ApplicationProcess: React.FC = () => {
  return (
    <section>
      <h2 className="text-3xl font-bold text-center text-gray-800">Simple Application Process</h2>
      <p className="mt-2 text-center text-gray-600">Our streamlined process simplifies applications for both federal and private sector positions.</p>
      
      <div className="mt-12 relative">
        <div className="absolute top-10 left-0 w-full h-1 bg-gray-200 hidden md:block">
            <div className="h-1 bg-blue-300 w-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <Step 
            icon={<UserIcon className="h-10 w-10" />}
            title="Create Your Profile"
            description="Register and build your federal resume with our guided tools."
            color="bg-blue-500"
          />
          <Step 
            icon={<SearchIcon className="h-10 w-10" />}
            title="Search & Filter Jobs"
            description="Use advanced filters to find positions matching your skills and preferences."
            color="bg-green-500"
          />
          <Step 
            icon={<DocumentTextIcon className="h-10 w-10" />}
            title="Submit Applications"
            description="Apply to multiple positions with one-click using your saved profile."
            color="bg-purple-500"
          />
          <Step 
            icon={<ChartBarIcon className="h-10 w-10" />}
            title="Track Progress"
            description="Monitor application status and receive updates throughout the process."
            color="bg-orange-500"
          />
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;
