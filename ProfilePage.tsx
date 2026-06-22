
import React from 'react';

const ProfileSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-3 mb-4">{title}</h2>
        {children}
    </div>
);

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <ProfileSection title="Veteran Preference">
                    <p className="text-sm text-gray-600 mb-4">Complete this section to claim veteran's preference for federal jobs.</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Are you a veteran?</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option>No</option>
                                <option>Yes, I am a preference eligible veteran</option>
                                <option>Yes, but I am not preference eligible</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Preference Type</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option>None</option>
                                <option>5-point preference</option>
                                <option>10-point preference (disability)</option>
                                <option>10-point preference (other)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Required Documentation (DD-214, VA Letters)</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <div className="flex text-sm text-gray-600"><label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"><span>Upload a file</span><input id="file-upload" name="file-upload" type="file" className="sr-only" /></label><p className="pl-1">or drag and drop</p></div><p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ProfileSection>

                <ProfileSection title="Job Search Preferences">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Locations</label>
                            <input type="text" placeholder="e.g. Washington, DC; Remote" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Preferred Agencies</label>
                            <input type="text" placeholder="e.g. Department of State, NASA" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                    </div>
                </ProfileSection>
            </div>
            <div className="lg:col-span-1 space-y-8">
                <ProfileSection title="Document Management">
                     <ul className="space-y-2 text-sm">
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded"><span>Federal_Resume_v3.pdf</span> <a href="#" className="text-indigo-600 hover:underline">Download</a></li>
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded"><span>Cover_Letter_Generic.pdf</span> <a href="#" className="text-indigo-600 hover:underline">Download</a></li>
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded"><span>PMP_Certificate.pdf</span> <a href="#" className="text-indigo-600 hover:underline">Download</a></li>
                    </ul>
                    <button className="mt-4 w-full bg-indigo-50 text-indigo-700 py-2 px-3 rounded-md hover:bg-indigo-100">Upload New Document</button>
                </ProfileSection>
                <ProfileSection title="Email Notifications">
                     <div className="space-y-3">
                        <label className="flex items-center"><input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/> <span className="ml-2 text-sm">New job alerts</span></label>
                        <label className="flex items-center"><input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/> <span className="ml-2 text-sm">Application status updates</span></label>
                        <label className="flex items-center"><input type="checkbox" defaultChecked className="h-4 w-4 text-indigo-600 border-gray-300 rounded"/> <span className="ml-2 text-sm">Weekly newsletter</span></label>
                    </div>
                </ProfileSection>
                 <button className="w-full bg-brand-blue text-white py-3 px-4 rounded-md hover:bg-blue-700 font-bold">Save Profile Changes</button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
