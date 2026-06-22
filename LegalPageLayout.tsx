import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ScaleIcon } from './icons';

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

const legalNavLinks = [
    { path: '/privacy-policy', name: 'Privacy Policy' },
    { path: '/terms-of-use', name: 'Terms of Use' },
    { path: '/foia', name: 'FOIA' },
    { path: '/no-fear-act', name: 'No FEAR Act' },
    { path: '/equal-opportunity', name: 'Equal Opportunity' },
];

const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ title, lastUpdated, children }) => {
    const location = useLocation();

    const navLinkClass = (path: string) =>
    `block px-4 py-2 text-sm rounded-md transition-colors ${
      location.pathname === path
        ? 'bg-brand-light-blue text-brand-blue font-semibold'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-brand-dark-blue text-white py-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="flex items-center">
                        <ScaleIcon className="h-10 w-10 mr-4 text-brand-light-blue"/>
                        <div>
                            <h1 className="text-4xl font-bold">{title}</h1>
                            <p className="text-sm text-gray-300 mt-1">Last Updated: {lastUpdated}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="lg:col-span-1">
                        <div className="bg-white p-4 rounded-lg shadow-md border sticky top-24">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 px-2">Legal Center</h3>
                            <nav className="space-y-1">
                                {legalNavLinks.map(link => (
                                    <NavLink key={link.path} to={link.path} className={navLinkClass(link.path)}>
                                        {link.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </aside>
                    <main className="lg:col-span-3">
                        <div className="bg-white p-8 rounded-lg shadow-md border prose max-w-none prose-h2:text-brand-dark-blue prose-h2:border-b prose-h2:pb-2 prose-a:text-brand-blue hover:prose-a:underline">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LegalPageLayout;
