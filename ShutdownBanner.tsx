
import React from 'react';
import { NavLink } from 'react-router-dom';
import { shutdowns } from '../constants';
import { ExclamationTriangleIcon } from './icons';

const ShutdownBanner: React.FC = () => {
    const currentShutdown = shutdowns.find(s => s.endDate === null);

    if (!currentShutdown) {
        return null;
    }

    return (
        <div className="bg-yellow-400 text-black py-2 px-4 md:px-8 animate-pulse">
            <div className="container mx-auto flex justify-center items-center text-center">
                <ExclamationTriangleIcon className="h-6 w-6 mr-3 text-red-700 hidden sm:block" />
                <p className="font-bold text-sm">
                    ATTENTION: The U.S. Government is currently experiencing a lapse in appropriations. Some services may be affected.
                    <NavLink to="/shutdowns" className="underline hover:text-red-700 ml-2 whitespace-nowrap">Learn More</NavLink>
                </p>
            </div>
        </div>
    );
};

export default ShutdownBanner;
