import React from 'react';
import LegalPageLayout from '../../components/LegalPageLayout';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="October 1, 2025">
            <p>
                The USAJobs Portal is committed to protecting the privacy and security of our users. This Privacy Policy describes how we collect, use, store, and disclose your information when you use our website and services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
                <li><strong>Personal Information:</strong> This includes your name, email address, phone number, address, work history, educational background, veteran status, and other information you provide when creating a profile or applying for a job.</li>
                <li><strong>Usage Data:</strong> We automatically collect information about your interaction with our site, such as your IP address, browser type, pages visited, and the dates/times of your visits.</li>
                <li><strong>Cookies and Tracking Technologies:</strong> We use cookies to enhance your user experience, such as keeping you logged in and remembering your preferences.</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>Your information is used to:</p>
            <ul>
                <li>Provide and maintain our services, including processing your job applications.</li>
                <li>Communicate with you about your account and application status.</li>
                <li>Personalize your experience and recommend relevant job opportunities.</li>
                <li>Improve our website and services through analysis of usage data.</li>
                <li>Comply with legal obligations and enforce our policies.</li>
            </ul>

            <h2>3. Data Sharing and Disclosure</h2>
            <p>
                When you apply for a federal job, your information is securely transmitted to the respective government agency for hiring consideration. For private sector jobs, your application data is shared with the hiring company. We do not sell your personal information to third parties. We may share anonymized, aggregated data for statistical purposes.
            </p>

            <h2>4. Data Security</h2>
            <p>
                We implement robust security measures, including encryption and access controls, to protect your information from unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet is 100% secure.
            </p>
            
            <h2>5. Your Rights and Choices</h2>
            <p>
                You have the right to access, update, or delete your personal information through your profile settings at any time. You can also opt-out of certain communications and manage your cookie preferences through your browser settings.
            </p>

            <h2>6. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy periodically. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>7. Contact Us</h2>
            <p>
                If you have any questions about this Privacy Policy, please contact our Privacy Office at <a href="mailto:privacy@usajobsportal.gov">privacy@usajobsportal.gov</a>.
            </p>
        </LegalPageLayout>
    );
};

export default PrivacyPolicyPage;
