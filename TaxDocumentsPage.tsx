
import React, { useState, useMemo } from 'react';
import { taxForms } from '../constants';
import { DownloadIcon, SearchIcon } from '../components/icons';
import { TaxForm } from '../types';

const FormCard: React.FC<{ form: TaxForm }> = ({ form }) => (
    <div className="bg-white p-4 rounded-lg shadow-md border flex items-center justify-between">
        <div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${form.category === 'Federal' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                {form.category}{form.state ? `: ${form.state}` : ''}
            </span>
            <h3 className="text-md font-bold text-gray-800 mt-2">{form.name}</h3>
            <p className="text-sm text-gray-600">{form.description}</p>
            <p className="text-xs text-gray-500 mt-1">{form.pages} pages</p>
        </div>
        <button className="p-2 text-gray-500 hover:text-brand-blue rounded-full hover:bg-gray-100">
            <DownloadIcon className="h-6 w-6" />
        </button>
    </div>
);

const TaxDocumentsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedState, setSelectedState] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const states = useMemo(() => ['All', ...new Set(taxForms.filter(f => f.state).map(f => f.state!))], []);
    
    const filteredForms = useMemo(() => {
        return taxForms.filter(form => {
            const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) || form.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || form.category === selectedCategory;
            const matchesState = selectedState === 'All' || form.state === selectedState || form.category === 'Federal';
            return matchesSearch && matchesCategory && matchesState;
        });
    }, [searchTerm, selectedCategory, selectedState]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Tax Documents Center</h1>
                <p className="text-gray-600 mb-8">Find and download necessary federal and state tax forms.</p>

                <div className="bg-white p-4 rounded-lg shadow-sm mb-6 sticky top-20 z-10 border">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2 relative">
                             <input 
                                type="text"
                                placeholder="Search by form name or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="All">All Categories</option>
                                <option value="Federal">Federal</option>
                                <option value="State">State</option>
                            </select>
                        </div>
                        <div>
                            <select value={selectedState} onChange={e => setSelectedState(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md">
                                <option value="All">All States</option>
                                {states.slice(1).map(state => <option key={state} value={state}>{state}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">{filteredForms.length} forms found.</p>
                    <button className="bg-brand-blue text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-blue-700">
                        <DownloadIcon className="h-4 w-4 inline mr-2"/>
                        Bulk Download Selected
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredForms.map(form => (
                        <FormCard key={form.id} form={form} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TaxDocumentsPage;
