import React from 'react';
import LegalPageLayout from '../../components/LegalPageLayout';

const NoFEARActPage: React.FC = () => {
    return (
        <LegalPageLayout title="No FEAR Act" lastUpdated="September 20, 2025">
            <p>
                The Notification and Federal Employee Antidiscrimination and Retaliation Act of 2002 (No FEAR Act) aims to increase federal agency accountability for acts of discrimination or reprisal against employees.
            </p>

            <h2>1. What is the No FEAR Act?</h2>
            <p>
                This law requires that federal agencies be accountable for violations of anti-discrimination and whistleblower protection laws. The Act requires agencies to provide this notice to federal employees, former federal employees, and applicants for federal employment to inform them of their rights under these laws.
            </p>

            <h2>2. Antidiscrimination Laws</h2>
            <p>A federal agency cannot discriminate against an employee or applicant with respect to the terms, conditions or privileges of employment on the basis of race, color, religion, sex (including pregnancy and gender identity), national origin, age (40 or older), disability, marital status, or political affiliation.</p>

            <h2>3. Whistleblower Protection</h2>
            <p>
                A federal employee with authority to take, direct others to take, recommend, or approve any personnel action shall not use that authority to take or fail to take, or threaten to take or fail to take, a personnel action against an employee or applicant for making a protected disclosure.
            </p>
            
            <h2>4. Equal Employment Opportunity (EEO) Data</h2>
            <p>
                In accordance with the No FEAR Act, we are required to post summary statistical data relating to EEO complaints filed against our agency. The data below is for demonstration purposes.
            </p>

            <div className="overflow-x-auto my-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiscal Year 2025</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaints Filed</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Findings of Discrimination</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Number of Complaints</td>
                            <td className="px-6 py-4 whitespace-nowrap">25</td>
                            <td className="px-6 py-4 whitespace-nowrap">2</td>
                        </tr>
                         <tr>
                            <td className="px-6 py-4 whitespace-nowrap">Processing Time (Days)</td>
                            <td className="px-6 py-4 whitespace-nowrap">180</td>
                            <td className="px-6 py-4 whitespace-nowrap">N/A</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>5. Further Information</h2>
            <p>
                For more detailed information regarding the No FEAR Act, please consult the website of the <a href="https://www.eeoc.gov/" target="_blank" rel="noopener noreferrer">U.S. Equal Employment Opportunity Commission</a>. For questions about your rights, contact our EEO office.
            </p>
        </LegalPageLayout>
    );
};

export default NoFEARActPage;
