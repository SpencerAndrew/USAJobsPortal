import React from 'react';
import LegalPageLayout from '../../components/LegalPageLayout';

const EqualOpportunityPage: React.FC = () => {
    return (
        <LegalPageLayout title="Equal Employment Opportunity (EEO)" lastUpdated="June 15, 2025">
            <h2>1. EEO Policy Statement</h2>
            <p>
                The USAJobs Portal is an equal opportunity employer. It is our policy to provide equal employment opportunity for all applicants and employees. We do not discriminate on any basis prohibited by federal law. All personnel actions, including recruitment, hiring, training, and promotions, are administered without regard to any protected characteristic.
            </p>

            <h2>2. Protected Bases</h2>
            <p>
                Discrimination is prohibited on the basis of:
            </p>
            <ul>
                <li>Race</li>
                <li>Color</li>
                <li>Religion</li>
                <li>Sex (including pregnancy, gender identity, and sexual orientation)</li>
                <li>National Origin</li>
                <li>Age (40 and over)</li>
                <li>Disability (physical or mental)</li>
                <li>Genetic Information</li>
                <li>Retaliation for prior EEO activity</li>
            </ul>

            <h2>3. Reasonable Accommodation</h2>
            <p>
                The USAJobs Portal provides reasonable accommodation for qualified individuals with disabilities and for sincerely held religious beliefs. If you need a reasonable accommodation for any part of the application and hiring process, please notify the agency contact identified in the job announcement.
            </p>

            <h2>4. How to File an EEO Complaint</h2>
            <p>
                If you believe you have been subjected to discrimination, you must contact an EEO Counselor within <strong>45 calendar days</strong> of the alleged discriminatory act. The EEO Counselor will provide you with information about your rights and responsibilities in the EEO complaint process.
            </p>
            <p>
                The goal of EEO counseling is to seek an informal resolution. If counseling is unsuccessful, you will be issued a "Notice of Right to File a Formal Complaint."
            </p>
            
            <h2>5. Contact the EEO Office</h2>
            <p>
                To initiate the EEO counseling process or for more information, please contact our EEO Office:
            </p>
            <address className="not-italic border-l-4 pl-4 my-4">
                USAJobs Portal EEO Office<br />
                Email: <a href="mailto:eeo@usajobsportal.gov">eeo@usajobsportal.gov</a><br />
                Phone: (202) 555-0199
            </address>
        </LegalPageLayout>
    );
};

export default EqualOpportunityPage;
