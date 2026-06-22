
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { jobs } from '../constants';

const steps = ['Personal Info', 'Work Experience', 'Education', 'Job Specific', 'Review & Submit'];

const ApplyPage: React.FC = () => {
    const { jobId } = useParams();
    const job = jobs.find(j => j.id === jobId);
    const [currentStep, setCurrentStep] = useState(0);

    if (!job) {
        return <div className="text-center py-20">Job not found.</div>;
    }

    const isGovernment = job.sector === 'Government';
    const govSteps = ['Personal Info', 'Federal Experience', 'Veteran Preference', 'Security Clearance', 'Review'];
    const privateSteps = ['Personal Info', 'Work History', 'Education', 'Background Check', 'Submit'];
    const applicationSteps = isGovernment ? govSteps : privateSteps;


    const nextStep = () => setCurrentStep(prev => (prev < applicationSteps.length - 1 ? prev + 1 : prev));
    const prevStep = () => setCurrentStep(prev => (prev > 0 ? prev - 1 : prev));
    
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-center">Apply for {job.title}</h1>
                <p className="text-center text-gray-600 mb-8">at {isGovernment ? job.agency : job.company}</p>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg border">
                    {/* Step Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            {applicationSteps.map((step, index) => (
                                <React.Fragment key={step}>
                                    <div className="flex flex-col items-center text-center">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-brand-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                                            {index < currentStep ? '✓' : index + 1}
                                        </div>
                                        <p className={`mt-2 text-xs ${index <= currentStep ? 'font-semibold text-brand-blue' : 'text-gray-500'}`}>{step}</p>
                                    </div>
                                    {index < applicationSteps.length - 1 && <div className={`flex-grow h-1 mx-2 ${index < currentStep ? 'bg-brand-blue' : 'bg-gray-200'}`}></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="min-h-[300px]">
                        <h2 className="text-2xl font-bold mb-4">{applicationSteps[currentStep]}</h2>
                        {currentStep === 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div><label className="block text-sm">First Name</label><input type="text" className="w-full mt-1 border-gray-300 rounded-md" /></div>
                                <div><label className="block text-sm">Last Name</label><input type="text" className="w-full mt-1 border-gray-300 rounded-md" /></div>
                                <div><label className="block text-sm">Email</label><input type="email" className="w-full mt-1 border-gray-300 rounded-md" /></div>
                                <div><label className="block text-sm">Phone</label><input type="tel" className="w-full mt-1 border-gray-300 rounded-md" /></div>
                            </div>
                        )}
                        {currentStep === 1 && (
                            <div><p className="text-gray-600">This section would contain fields for {applicationSteps[1]}.</p></div>
                        )}
                         {currentStep === 2 && (
                            <div><p className="text-gray-600">This section would contain fields for {applicationSteps[2]}.</p></div>
                        )}
                         {currentStep === 3 && (
                            <div><p className="text-gray-600">This section would contain fields for {applicationSteps[3]}.</p></div>
                        )}
                         {currentStep === 4 && (
                            <div><p className="text-gray-600">Please review your application before submitting.</p></div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 pt-5 border-t flex justify-between">
                        <button onClick={prevStep} disabled={currentStep === 0} className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md disabled:opacity-50">
                            Back
                        </button>
                        {currentStep < applicationSteps.length - 1 ? (
                            <button onClick={nextStep} className="bg-brand-blue text-white py-2 px-4 rounded-md">
                                Next
                            </button>
                        ) : (
                            <button className="bg-green-600 text-white py-2 px-4 rounded-md">
                                Submit Application
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyPage;
