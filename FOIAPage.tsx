import React from 'react';
import LegalPageLayout from '../../components/LegalPageLayout';

const FOIAPage: React.FC = () => {
    return (
        <LegalPageLayout title="Freedom of Information Act (FOIA)" lastUpdated="August 5, 2025">
            <p>
                The Freedom of Information Act (FOIA) is a federal law that provides the public with the right to request access to records from any federal agency. The USAJobs Portal, as a (fictional) entity of the U.S. Government, is committed to transparency and open government.
            </p>

            <h2>1. About FOIA</h2>
            <p>
                FOIA requires federal agencies to disclose records upon receiving a written request. It is a vital part of our democracy, ensuring that the government is accountable to the people it serves. Some records may be protected from disclosure by one of nine exemptions contained in the law.
            </p>

            <h2>2. How to Make a FOIA Request</h2>
            <p>Before submitting a request, we encourage you to first check our FOIA Reading Room for publicly available information. If you cannot find what you are looking for, you may submit a formal request. A FOIA request must:</p>
            <ul>
                <li>Be made in writing.</li>
                <li>Clearly describe the records you are seeking with enough detail for a professional employee familiar with the subject to locate them.</li>
                <li>State your willingness to pay applicable fees or provide a justification for a fee waiver.</li>
            </ul>
            <p>
                Requests can be submitted via email to <a href="mailto:foia@usajobsportal.gov">foia@usajobsportal.gov</a> or by mail to:
            </p>
            <address className="not-italic border-l-4 pl-4 my-4">
                USAJobs Portal FOIA Office<br />
                123 Constitution Ave NW<br />
                Washington, DC 20001
            </address>

            <h2>3. FOIA Reading Room</h2>
            <p>The Electronic Reading Room contains records that are frequently requested under the FOIA. These include:</p>
            <ul>
                <li><a href="#">Final Opinions and Orders</a></li>
                <li><a href="#">Policy Statements</a></li>
                <li><a href="#">Administrative Staff Manuals</a></li>
                <li><a href="#">Frequently Requested Records</a></li>
            </ul>

            <h2>4. Fees</h2>
            <p>
                There is no initial fee to make a FOIA request. However, the Portal may charge fees for searching, reviewing, and duplicating records. Small requests are often processed without charge. You will be notified if any fees are applicable to your request.
            </p>

            <h2>5. Contact the FOIA Public Liaison</h2>
            <p>
                For questions about your request or the FOIA process, you may contact our FOIA Public Liaison at <a href="mailto:foia-liaison@usajobsportal.gov">foia-liaison@usajobsportal.gov</a>.
            </p>
        </LegalPageLayout>
    );
};

export default FOIAPage;
