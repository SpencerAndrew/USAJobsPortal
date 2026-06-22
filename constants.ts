
import { Job, Agency, Holiday, ChangelogItem, TaxForm, JobSector, UpdateType, Shutdown, ShutdownQuestion } from './types';
import { FlagIcon, ShieldIcon, CalendarIcon, UsersIcon, StarIcon, HomeIcon, BriefcaseIcon } from './components/icons';

export const jobs: Job[] = [
  {
    id: 'gov1',
    title: 'IT Specialist (Systems Administration)',
    sector: JobSector.Government,
    agency: 'Department of Defense',
    location: 'Washington, DC',
    salary: '$72,030 - $93,638',
    payGrade: 'GS-12',
    type: 'Full-time',
    securityClearance: 'Secret Clearance Required',
    deadline: '2026-12-15',
    applicants: 128,
  },
  {
    id: 'gov2',
    title: 'Program Analyst',
    sector: JobSector.Government,
    agency: 'Department of Health and Human Services',
    location: 'Atlanta, GA',
    salary: '$59,966 - $77,955',
    payGrade: 'GS-11',
    type: 'Full-time',
    securityClearance: 'Public Trust',
    deadline: '2026-12-20',
    applicants: 250,
  },
  {
    id: 'gov3',
    title: 'Administrative Officer',
    sector: JobSector.Government,
    agency: 'Department of State',
    location: 'Multiple Locations',
    salary: '$45,146 - $58,687',
    payGrade: 'GS-09',
    type: 'Full-time',
    securityClearance: 'Top Secret Clearance',
    deadline: '2026-12-25',
    applicants: 312,
  },
  {
    id: 'gov4',
    title: 'Financial Management Analyst',
    sector: JobSector.Government,
    agency: 'Department of Treasury',
    location: 'New York, NY',
    salary: '$86,962 - $113,047',
    payGrade: 'GS-13',
    type: 'Full-time',
    securityClearance: 'None Required',
    deadline: '2026-12-18',
    applicants: 98,
  },
  {
    id: 'gov5',
    title: 'Cybersecurity Specialist',
    sector: JobSector.Government,
    agency: 'Department of Homeland Security',
    location: 'Arlington, VA',
    salary: '$112,015 - $145,617',
    payGrade: 'GS-14',
    type: 'Full-time',
    securityClearance: 'Top Secret/SCI',
    deadline: '2026-12-22',
    applicants: 175,
  },
  {
    id: 'gov6',
    title: 'Environmental Protection Specialist',
    sector: JobSector.Government,
    agency: 'Environmental Protection Agency',
    location: 'Denver, CO',
    salary: '$59,966 - $77,955',
    payGrade: 'GS-11',
    type: 'Full-time',
    securityClearance: 'None Required',
    deadline: '2026-12-28',
    applicants: 201,
  },
  {
    id: 'priv1',
    title: 'Barista',
    sector: JobSector.Private,
    company: 'Starbucks',
    companyLogo: 'https://logo.clearbit.com/starbucks.com',
    location: 'Seattle, WA',
    salary: '$15.00 - $18.50 / hour',
    type: 'Part-time',
    securityClearance: 'N/A',
    deadline: 'Open Until Filled',
    applicants: 45,
  },
  {
    id: 'priv2',
    title: 'Cashier',
    sector: JobSector.Private,
    company: 'Target',
    companyLogo: 'https://logo.clearbit.com/target.com',
    location: 'Minneapolis, MN',
    salary: '$16.25 - $19.00 / hour',
    type: 'Full-time',
    securityClearance: 'N/A',
    deadline: 'Open Until Filled',
    applicants: 88,
  },
  {
    id: 'priv3',
    title: 'Sales Associate',
    sector: JobSector.Private,
    company: 'Best Buy',
    companyLogo: 'https://logo.clearbit.com/bestbuy.com',
    location: 'Richfield, MN',
    salary: '$17.00 - $21.00 / hour',
    type: 'Full-time',
    securityClearance: 'N/A',
    deadline: 'Open Until Filled',
    applicants: 62,
  },
];

export const agencies: Agency[] = [
  { abbr: 'DOD', name: 'Department of Defense', openPositions: 1247 },
  { abbr: 'VA', name: 'Department of Veterans Affairs', openPositions: 892 },
  { abbr: 'DHS', name: 'Department of Homeland Security', openPositions: 634 },
  { abbr: 'HHS', name: 'Department of Health and Human Services', openPositions: 578 },
  { abbr: 'DOJ', name: 'Department of Justice', openPositions: 423 },
  { abbr: 'TREAS', name: 'Department of Treasury', openPositions: 356 },
  { abbr: 'USDA', name: 'Department of Agriculture', openPositions: 298 },
  { abbr: 'DOT', name: 'Department of Transportation', openPositions: 267 },
  { abbr: 'EPA', name: 'Environmental Protection Agency', openPositions: 189 },
  { abbr: 'NASA', name: 'National Aeronautics and Space Administration', openPositions: 145 },
  { abbr: 'DOE', name: 'Department of Energy', openPositions: 134 },
  { abbr: 'STATE', name: 'Department of State', openPositions: 98 },
];

export const holidays2026: Holiday[] = [
    { name: "New Year's Day", date: '2026-01-01T00:00:00', description: "Celebrates the first day of the year.", icon: CalendarIcon },
    { name: "Martin Luther King, Jr.'s Birthday", date: '2026-01-19T00:00:00', description: "Honors civil rights leader Martin Luther King, Jr.", icon: UsersIcon },
    { name: "Washington's Birthday (Presidents' Day)", date: '2026-02-16T00:00:00', description: "Honors U.S. presidents.", icon: StarIcon },
    { name: "Memorial Day", date: '2026-05-25T00:00:00', description: "Honors military personnel who died in service.", icon: ShieldIcon },
    { name: "Juneteenth National Independence Day", date: '2026-06-19T00:00:00', description: "Commemorates the end of slavery in the U.S.", icon: FlagIcon },
    { name: "Independence Day", date: '2026-07-04T00:00:00', description: "Celebrates the Declaration of Independence.", icon: FlagIcon },
    { name: "Labor Day", date: '2026-09-07T00:00:00', description: "Celebrates the American labor movement.", icon: BriefcaseIcon },
    { name: "Columbus Day", date: '2026-10-12T00:00:00', description: "Commemorates the arrival of Christopher Columbus.", icon: HomeIcon },
    { name: "Veterans Day", date: '2026-11-11T00:00:00', description: "Honors all military veterans.", icon: ShieldIcon },
    { name: "Thanksgiving Day", date: '2026-11-26T00:00:00', description: "A day of giving thanks for the harvest.", icon: UsersIcon },
    { name: "Christmas Day", date: '2026-12-25T00:00:00', description: "Celebrates the birth of Jesus Christ.", icon: StarIcon },
];

export const changelogItems: ChangelogItem[] = [
    {
        version: '3.5.0',
        date: 'January 2, 2026',
        title: 'Happy New Year 2026 Update',
        description: 'Updated the Federal Holiday Calendar for 2026 and refreshed all site-wide copyright notices to the new year.',
        type: UpdateType.Improvement,
    },
    {
        version: '3.4.0',
        date: 'October 18, 2025',
        title: 'Comprehensive Legal Center Launch',
        description: 'Launched a comprehensive legal center with dedicated pages for Privacy Policy, Terms of Use, FOIA, No FEAR Act, and Equal Opportunity. Includes a new unified layout with side-navigation for easy access to all legal documents.',
        type: UpdateType.Feature,
    },
    {
        version: '3.3.0',
        date: 'October 15, 2025',
        title: 'Government Shutdown Tracking & UI Enhancements',
        description: 'Introduced a new "Government Shutdowns" page with historical data and a live timer for current events. Added a site-wide alert banner for active shutdowns. Simplified the homepage\'s featured jobs view by removing the pay grade display.',
        type: UpdateType.Feature,
    },
    {
        version: '3.2.1',
        date: 'October 12, 2025',
        title: 'Layout Fixes & Content Updates',
        description: 'Corrected the header layout to prevent element overlapping and ensure proper alignment. Updated hero and application process descriptions to better reflect the inclusion of private sector job opportunities.',
        type: UpdateType.Improvement,
    },
    {
        version: '3.2.0',
        date: 'October 10, 2025',
        title: 'Holiday Calendar Updated for 2025',
        description: 'The Federal Holiday Calendar has been updated with 2025 dates and the countdown timer is now tracking the next holiday of the new year.',
        type: UpdateType.Improvement,
    },
    {
        version: '3.1.0',
        date: 'October 5, 2025',
        title: 'UI & Layout Enhancements',
        description: 'Updated the site header for better spacing, enlarged and centered the time zone bar, and updated the footer copyright to 2025.',
        type: UpdateType.Improvement,
    },
];


export const taxForms: TaxForm[] = [
    // Federal
    { id: 'f1', name: 'W-4', description: "Employee's Withholding Certificate", category: 'Federal', pages: 4 },
    { id: 'f2', name: 'Form I-9', description: "Employment Eligibility Verification", category: 'Federal', pages: 2 },
    { id: 'f3', name: '1040', description: "U.S. Individual Income Tax Return", category: 'Federal', pages: 2 },
    { id: 'f4', name: 'W-2', description: "Wage and Tax Statement", category: 'Federal', pages: 1 },
    { id: 'f5', name: '1099-MISC', description: "Miscellaneous Income", category: 'Federal', pages: 2 },
    { id: 'f6', name: 'SS-4', description: "Application for Employer Identification Number (EIN)", category: 'Federal', pages: 2 },
    { id: 'f7', name: 'Form 941', description: "Employer's QUARTERLY Federal Tax Return", category: 'Federal', pages: 3 },
    // California
    { id: 's1', name: 'DE 4', description: "Employee's Withholding Allowance Certificate", category: 'State', state: 'California', pages: 4 },
    { id: 's2', name: 'Form 540', description: "California Resident Income Tax Return", category: 'State', state: 'California', pages: 5 },
    // New York
    { id: 's3', name: 'IT-201', description: "Resident Income Tax Return", category: 'State', state: 'New York', pages: 4 },
    { id: 's4', name: 'IT-2104', description: "Employee's Withholding Allowance Certificate", category: 'State', state: 'New York', pages: 4 },
    // Texas
    { id: 's5', name: 'AP-201', description: "Texas Application for Sales and Use Tax Permit", category: 'State', state: 'Texas', pages: 4 },
    // Florida
    { id: 's6', name: 'DR-1', description: "Florida Business Tax Application", category: 'State', state: 'Florida', pages: 4 },
];

export const shutdowns: Shutdown[] = [
    {
        id: 'shutdown2025',
        name: 'Government Shutdown of Late 2025',
        startDate: '2025-09-30T00:00:00',
        endDate: '2025-10-20T00:00:00',
        economicCost: '$1.6 Trillion',
        jobsAffected: '~880,000 Furloughed',
        description: 'Triggered by a congressional impasse over the federal budget for the fiscal year beginning October 1, 2025. Key disagreements revolve around funding for infrastructure projects and social programs. According to President Trump, 1.6 Trillion Dollars was lost in economic output during the 2025 shutdown.'
    },
    {
        id: 'shutdown2024',
        name: 'Government Shutdown of Late 2024',
        startDate: '2024-10-01T00:00:00',
        endDate: '2024-10-21T00:00:00',
        economicCost: '$5.6 Billion',
        jobsAffected: '~850,000 Furloughed',
        description: 'Caused by a failure to pass appropriations bills for the new fiscal year. Resolved after a three-week negotiation period between Congress and the White House to resolve budgetary disputes.'
    },
    {
        id: 'shutdown2018',
        name: '2018–2019 Government Shutdown',
        startDate: '2018-12-22T00:00:00',
        endDate: '2019-01-25T00:00:00',
        economicCost: '$11 Billion',
        jobsAffected: '~800,000 Furloughed or working without pay',
        description: 'The longest U.S. government shutdown in history, it stemmed from an impasse over presidential demands for federal funds for a U.S.–Mexico border wall.'
    },
    {
        id: 'shutdown2013',
        name: '2013 Government Shutdown',
        startDate: '2013-10-01T00:00:00',
        endDate: '2013-10-17T00:00:00',
        economicCost: '$24 Billion',
        jobsAffected: '~850,000 Furloughed',
        description: 'This shutdown occurred due to a dispute over the implementation of the Affordable Care Act (ACA), as some members of Congress sought to defund or delay the healthcare law.'
    },
    {
        id: 'shutdown1995',
        name: '1995–1996 Government Shutdowns',
        startDate: '1995-11-14T00:00:00',
        endDate: '1996-01-06T00:00:00',
        economicCost: '$2.1 Billion',
        jobsAffected: '~284,000 Furloughed initially, 700,000 later',
        description: 'A series of two shutdowns resulting from a budget dispute between Democratic President Bill Clinton and a Republican-controlled Congress over funding for Medicare, education, the environment, and public health.'
    }
];

export const shutdownQuestions: ShutdownQuestion[] = [
    {
        question: "What is a government shutdown?",
        answer: "A government shutdown occurs when non-essential government offices are closed due to a failure by Congress to pass funding legislation. This happens when the legislative and executive branches cannot agree on a budget for the upcoming fiscal year."
    },
    {
        question: "Who is affected by a government shutdown?",
        answer: "Hundreds of thousands of federal employees are either furloughed (sent home without pay) or required to work without pay. Additionally, many government services are suspended, which can affect the public through closures of national parks, delays in processing passports, and reduced services from agencies like the IRS."
    },
    {
        question: "What services remain open during a shutdown?",
        answer: "Essential services continue to operate. This includes activities related to national security, public safety, and critical public health. Examples include air traffic control, law enforcement, border protection, and emergency medical care. Social Security and Medicare payments also continue."
    },
    {
        question: "Do federal employees get paid during a shutdown?",
        answer: "Furloughed employees do not get paid during the shutdown. 'Essential' employees who are required to work also do not receive their paychecks on time. Historically, Congress has always passed legislation to provide back pay to all federal employees after the shutdown ends."
    },
    {
        question: "What is the economic impact of a shutdown?",
        answer: "Shutdowns have a significant negative impact on the economy. They reduce GDP due to lost productivity from federal workers and contractors. Consumer confidence often drops, leading to reduced spending. The uncertainty also disrupts private businesses that rely on government services or contracts."
    }
];
