
import React from 'react';

const StatusIndicator: React.FC<{ status: string; color: string }> = ({ status, color }) => (
  <div className="flex items-center">
    <span className={`h-2.5 w-2.5 rounded-full ${color} mr-2`}></span>
    <span className="text-sm font-medium">{status}</span>
  </div>
);

const ApplicationCard: React.FC<{ jobTitle: string; agency: string; refId: string; status: string; statusColor: string; nextStep: string; deadline: string; }> = 
({ jobTitle, agency, refId, status, statusColor, nextStep, deadline }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-lg font-bold text-gray-800">{jobTitle}</h3>
                <p className="text-brand-blue font-semibold">{agency}</p>
                <p className="text-xs text-gray-500 mt-1">Ref #: {refId}</p>
            </div>
            <StatusIndicator status={status} color={statusColor} />
        </div>
        <div className="mt-4 border-t pt-4">
            <p className="text-sm font-semibold text-gray-700">Next Step:</p>
            <p className="text-sm text-gray-600">{nextStep}</p>
            <p className="text-sm text-gray-500 mt-2">Deadline: {deadline}</p>
        </div>
        <div className="mt-4 flex gap-2">
            <button className="flex-1 bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded-md hover:bg-gray-200">Contact HR</button>
            <button className="flex-1 bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded-md hover:bg-gray-200">Documents</button>
        </div>
    </div>
);

const ApplicationsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">My Applications</h1>
        <p className="text-gray-600 mb-8">Track the status of all your submitted job applications.</p>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
            <div>
                <span className="font-semibold">Total Applications: 5</span>
            </div>
            <div>
                <select className="text-sm border-gray-300 rounded-md">
                    <option>Filter by status</option>
                    <option>Under Review</option>
                    <option>Interview Scheduled</option>
                    <option>Offer Extended</option>
                    <option>Not Selected</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ApplicationCard 
                jobTitle="IT Specialist"
                agency="Department of Defense"
                refId="DOD-2024-1123"
                status="Under Review"
                statusColor="bg-yellow-400"
                nextStep="Awaiting hiring manager review."
                deadline="N/A"
            />
            <ApplicationCard 
                jobTitle="Program Analyst"
                agency="Department of Health and Human Services"
                refId="HHS-2024-987"
                status="Interview Scheduled"
                statusColor="bg-green-500"
                nextStep="Virtual interview on Dec 15, 2024."
                deadline="Dec 14, 2024"
            />
            <ApplicationCard 
                jobTitle="Cybersecurity Specialist"
                agency="Department of Homeland Security"
                refId="DHS-2024-456"
                status="Referred"
                statusColor="bg-blue-500"
                nextStep="Your application has been referred to the hiring manager."
                deadline="N/A"
            />
            <ApplicationCard 
                jobTitle="Administrative Officer"
                agency="Department of State"
                refId="DOS-2024-789"
                status="Not Selected"
                statusColor="bg-red-500"
                nextStep="Another candidate was selected for this position."
                deadline="N/A"
            />
             <ApplicationCard 
                jobTitle="Barista"
                agency="Starbucks"
                refId="SB-2024-101"
                status="Application Received"
                statusColor="bg-gray-400"
                nextStep="Thank you for your application. We will review it shortly."
                deadline="N/A"
            />
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
