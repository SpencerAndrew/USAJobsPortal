import React from 'react';
import LegalPageLayout from '../../components/LegalPageLayout';

const TermsOfUsePage: React.FC = () => {
    return (
        <LegalPageLayout title="Terms of Use" lastUpdated="October 1, 2025">
            <p>
                Welcome to the USAJobs Portal. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions of use. Please review these terms carefully.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
                This Agreement specifies the Terms and Conditions for access to and use of the USAJobs Portal. This Agreement may be modified at any time by us upon posting of the modified Agreement. Any such modifications shall be effective immediately.
            </p>

            <h2>2. User Conduct and Responsibilities</h2>
            <p>You agree to use the website for lawful purposes only. You are responsible for the accuracy, integrity, and legality of the information you submit. You agree not to:</p>
            <ul>
                <li>Post any false, misleading, or inaccurate information.</li>
                <li>Violate any applicable local, state, national, or international law.</li>
                <li>Infringe upon the intellectual property rights of others.</li>
                <li>Attempt to gain unauthorized access to our computer systems or engage in any activity that disrupts, diminishes the quality of, interferes with the performance of, or impairs the functionality of the Service.</li>
            </ul>

            <h2>3. Account Security</h2>
            <p>
                If you create an account on the USAJobs Portal, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.
            </p>
            
            <h2>4. Disclaimers and Limitation of Liability</h2>
            <p>
                The USAJobs Portal is provided on an "as is" and "as available" basis. We make no warranties, expressed or implied, regarding the operation of the service or the information, content, or materials included. We will not be liable for any damages of any kind arising from the use of this site, including, but not limited to, direct, indirect, incidental, punitive, and consequential damages.
            </p>
            
            <h2>5. Termination</h2>
            <p>
                We reserve the right to terminate your access to the site, without any advance notice, for conduct that we believe violates these Terms of Use or is harmful to other users of the site, us, or third parties, or for any other reason.
            </p>
            
            <h2>6. Governing Law</h2>
            <p>
                This Agreement shall be governed by and construed in accordance with the laws of the United States.
            </p>

            <h2>7. Contact Information</h2>
            <p>
                If you have any questions about these Terms of Use, please contact us at <a href="mailto:legal@usajobsportal.gov">legal@usajobsportal.gov</a>.
            </p>
        </LegalPageLayout>
    );
};

export default TermsOfUsePage;
