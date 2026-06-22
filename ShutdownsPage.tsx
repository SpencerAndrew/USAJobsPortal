
import React, { useMemo, useState } from 'react';
import { shutdowns, shutdownQuestions } from '../constants';
import { useCountUp } from '../hooks/useCountUp';
import { CalendarIcon, CurrencyDollarIcon, UserMinusIcon, ExclamationTriangleIcon, ChevronDownIcon } from '../components/icons';
import { Shutdown } from '../types';
import useAnimatedCounter from '../hooks/useAnimatedCounter';

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="text-center">
        <div className="bg-white rounded-lg shadow-inner p-4">
            <span className="text-4xl font-bold text-brand-dark-blue">{value.toString().padStart(2, '0')}</span>
        </div>
        <span className="text-sm text-gray-200 mt-2 block uppercase tracking-wider">{label}</span>
    </div>
);

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 text-brand-red">
            {icon}
        </div>
        <div className="ml-3">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-lg font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-4 px-2 hover:bg-gray-50 focus:outline-none"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-gray-800">{question}</span>
                <ChevronDownIcon className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 bg-gray-50 text-gray-700">
                    <p>{answer}</p>
                </div>
            </div>
        </div>
    );
};


const ShutdownsPage: React.FC = () => {
    const latestShutdown = shutdowns[0];
    const isOngoing = latestShutdown.endDate === null;
    const { days, hours, minutes, seconds } = useCountUp(latestShutdown.startDate);
    
    const { totalCost, totalJobs } = useMemo(() => {
        const historicalShutdowns = shutdowns.filter(s => s.endDate !== null);
        
        const parseCost = (costStr: string): number => {
            const value = parseFloat(costStr.replace(/[^0-9.]/g, ''));
            if (costStr.toLowerCase().includes('trillion')) return value * 1e12;
            if (costStr.toLowerCase().includes('billion')) return value * 1e9;
            if (costStr.toLowerCase().includes('million')) return value * 1e6;
            return value;
        };
        
        const parseJobs = (jobsStr: string): number => {
             return parseInt(jobsStr.split(' ')[0].replace(/[^0-9]/g, ''), 10);
        };

        const totalCost = historicalShutdowns.reduce((acc, s) => acc + parseCost(s.economicCost), 0);
        const totalJobs = historicalShutdowns.reduce((acc, s) => acc + parseJobs(s.jobsAffected), 0);
        
        return { totalCost, totalJobs };
    }, []);

    const animatedCost = useAnimatedCounter(totalCost);
    const animatedJobs = useAnimatedCounter(totalJobs);

    const getDuration = (start: string, end: string | null): string => {
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : new Date();
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} Day${diffDays !== 1 ? 's' : ''}`;
    };

    const displayCost = (cost: number) => {
        if (cost >= 1e12) {
            return `${(cost / 1e12).toFixed(2)} Trillion`;
        }
        return `${(cost / 1e9).toFixed(1)} Billion`;
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-brand-dark-blue text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ExclamationTriangleIcon className="h-12 w-12 mx-auto text-yellow-400" />
                    <h1 className="text-4xl font-bold mt-4">U.S. Government Shutdown Information</h1>
                    <p className="mt-2 text-lg text-gray-300">Tracking past and present federal funding gaps.</p>
                </div>
            </div>
            
            <div className="bg-white py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Historical Shutdown Impact</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm border">
                            <CurrencyDollarIcon className="h-10 w-10 mx-auto text-red-600 mb-3" />
                            <p className="text-4xl font-bold text-brand-dark-blue">
                                ${ displayCost(animatedCost) }
                            </p>
                            <p className="text-gray-600 mt-1">Total Estimated Economic Output Lost</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg text-center shadow-sm border">
                            <UserMinusIcon className="h-10 w-10 mx-auto text-red-600 mb-3" />
                             <p className="text-4xl font-bold text-brand-dark-blue">
                                { animatedJobs.toLocaleString() }
                            </p>
                            <p className="text-gray-600 mt-1">Total Federal Jobs Furloughed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Current/Recent Shutdown Section */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="bg-red-700 text-white rounded-lg shadow-2xl p-8">
                     <h2 className="text-2xl font-bold text-center text-yellow-300">{latestShutdown.name} {isOngoing ? '(Ongoing)' : ''}</h2>
                     <p className="text-center text-red-200 mt-1">
                        Started: {new Date(latestShutdown.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                     </p>
                    {isOngoing ? (
                         <div className="mt-6">
                            <h3 className="text-center font-semibold text-lg mb-4">Duration of Current Shutdown</h3>
                            <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
                                <CountdownUnit value={days} label="Days" />
                                <CountdownUnit value={hours} label="Hours" />
                                <CountdownUnit value={minutes} label="Minutes" />
                                <CountdownUnit value={seconds} label="Seconds" />
                            </div>
                        </div>
                    ) : (
                         <div className="mt-6 text-center">
                             <p className="font-semibold text-lg mb-2 text-red-100">This shutdown has ended.</p>
                             <p className="text-red-200">Ended: {new Date(latestShutdown.endDate!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                             <p className="text-red-200">Total Duration: {getDuration(latestShutdown.startDate, latestShutdown.endDate)}</p>
                         </div>
                    )}
                    <div className="mt-6 text-center text-red-100 max-w-3xl mx-auto">
                        <p>{latestShutdown.description}</p>
                    </div>
                </div>
            </div>

            {/* Historical Shutdowns */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Historical Shutdowns</h2>
                <div className="space-y-6">
                    {shutdowns.slice(1).map((shutdown: Shutdown) => (
                        <div key={shutdown.id} className="bg-white p-6 rounded-lg shadow-md border">
                            <h3 className="text-xl font-bold text-gray-900">{shutdown.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <CalendarIcon className="h-4 w-4 mr-1.5" />
                                <span>
                                    {new Date(shutdown.startDate).toLocaleDateString()} - {new Date(shutdown.endDate!).toLocaleDateString()}
                                </span>
                                <span className="mx-2">|</span>
                                <span>Duration: {getDuration(shutdown.startDate, shutdown.endDate)}</span>
                            </div>
                             <p className="mt-3 text-gray-600">{shutdown.description}</p>
                             <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-4">
                                <StatCard icon={<CurrencyDollarIcon className="h-6 w-6" />} label="Economic Cost" value={shutdown.economicCost} />
                                <StatCard icon={<UserMinusIcon className="h-6 w-6" />} label="Jobs Affected" value={shutdown.jobsAffected} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border">
                        {shutdownQuestions.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShutdownsPage;
