import React, { useState, useEffect, useMemo, useRef } from 'react';

// ================= TYPES =================
interface Job {
  id: string;
  title: string;
  sector: 'Government' | 'Private';
  agency?: string;
  company?: string;
  companyLogo?: string;
  location: string;
  salary: string;
  payGrade?: string;
  type: string;
  securityClearance: string;
  deadline: string;
  applicants: number;
}

interface Application {
  id: string;
  jobTitle: string;
  agency: string;
  refId: string;
  status: string;
  statusColor: string;
  nextStep: string;
  deadline: string;
}

interface Agency {
  abbr: string;
  name: string;
  openPositions: number;
}

interface Holiday {
  name: string;
  date: string;
  description: string;
  icon: string;
}

interface TaxForm {
  id: string;
  name: string;
  description: string;
  category: 'Federal' | 'State';
  state?: string;
  pages: number;
}

interface Shutdown {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  economicCost: string;
  jobsAffected: string;
  description: string;
}

interface TimeZone {
  label: string;
  timeZone: string;
}

// ================= DATASETS =================
const INITIAL_JOBS: Job[] = [
  {
    id: 'gov1',
    title: 'IT Specialist (Systems Administration)',
    sector: 'Government',
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
    sector: 'Government',
    agency: 'Department of Health & Human Services',
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
    sector: 'Government',
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
    title: 'Cybersecurity Specialist',
    sector: 'Government',
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
    id: 'priv1',
    title: 'Barista',
    sector: 'Private',
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
    sector: 'Private',
    company: 'Target',
    companyLogo: 'https://logo.clearbit.com/target.com',
    location: 'Minneapolis, MN',
    salary: '$16.25 - $19.00 / hour',
    type: 'Full-time',
    securityClearance: 'N/A',
    deadline: 'Open Until Filled',
    applicants: 88,
  }
];

const AGENCIES: Agency[] = [
  { abbr: 'DOD', name: 'Department of Defense', openPositions: 1247 },
  { abbr: 'VA', name: 'Department of Veterans Affairs', openPositions: 892 },
  { abbr: 'DHS', name: 'Department of Homeland Security', openPositions: 634 },
  { abbr: 'HHS', name: 'Department of Health and Human Services', openPositions: 578 },
  { abbr: 'DOJ', name: 'Department of Justice', openPositions: 423 },
  { abbr: 'TREAS', name: 'Department of Treasury', openPositions: 356 },
  { abbr: 'NASA', name: 'National Aeronautics and Space Administration', openPositions: 145 },
];

const HOLIDAYS: Holiday[] = [
  { name: "New Year's Day", date: '2026-01-01T00:00:00', description: "Celebrates the first day of the year.", icon: 'ri-calendar-line' },
  { name: "Martin Luther King, Jr.'s Birthday", date: '2026-01-19T00:00:00', description: "Honors civil rights leader Dr. King.", icon: 'ri-group-line' },
  { name: "Washington's Birthday (Presidents' Day)", date: '2026-02-16T00:00:00', description: "Honors U.S. presidents.", icon: 'ri-star-line' },
  { name: "Memorial Day", date: '2026-05-25T00:00:00', description: "Honors military personnel who died in service.", icon: 'ri-shield-line' },
  { name: "Juneteenth National Independence Day", date: '2026-06-19T00:00:00', description: "Commemorates the end of slavery.", icon: 'ri-flag-line' },
  { name: "Independence Day", date: '2026-07-04T00:00:00', description: "Celebrates the Declaration of Independence.", icon: 'ri-flag-line' },
  { name: "Labor Day", date: '2026-09-07T00:00:00', description: "Celebrates the American labor movement.", icon: 'ri-briefcase-line' },
  { name: "Veterans Day", date: '2026-11-11T00:00:00', description: "Honors all US military veterans.", icon: 'ri-shield-check-line' },
  { name: "Thanksgiving Day", date: '2026-11-26T00:00:00', description: "A national day of giving thanks.", icon: 'ri-home-line' },
  { name: "Christmas Day", date: '2026-12-25T00:00:00', description: "Celebrates the winter federal holiday.", icon: 'ri-star-line' },
];

const INITIAL_APPLICATIONS: Application[] = [
  { id: '1', jobTitle: 'IT Specialist', agency: 'Department of Defense', refId: 'DOD-2024-1123', status: 'Under Review', statusColor: 'bg-yellow-400', nextStep: 'Awaiting hiring manager selection lists.', deadline: 'N/A' },
  { id: '2', jobTitle: 'Program Analyst', agency: 'Department of Health and Human Services', refId: 'HHS-2024-987', status: 'Interview Scheduled', statusColor: 'bg-green-500', nextStep: 'Virtual interview on Dec 15.', deadline: 'Awaiting' },
  { id: '3', jobTitle: 'Cybersecurity Specialist', agency: 'Department of Homeland Security', refId: 'DHS-2024-456', status: 'Referred', statusColor: 'bg-blue-500', nextStep: 'Referred to hiring official.', deadline: 'N/A' },
  { id: '4', jobTitle: 'Administrative Officer', agency: 'Department of State', refId: 'DOS-2024-789', status: 'Not Selected', statusColor: 'bg-red-500', nextStep: 'Another candidate was selected.', deadline: 'N/A' },
  { id: '5', jobTitle: 'Barista', agency: 'Starbucks', refId: 'SB-2024-101', status: 'Application Received', statusColor: 'bg-gray-400', nextStep: 'Reviewing application background.', deadline: 'N/A' }
];

const TAX_FORMS: TaxForm[] = [
  { id: 'f1', name: 'W-4', description: "Employee's Withholding Certificate", category: 'Federal', pages: 4 },
  { id: 'f2', name: 'Form I-9', description: "Employment Eligibility Verification", category: 'Federal', pages: 2 },
  { id: 'f3', name: 'Form 1040', description: "U.S. Individual Income Tax Return", category: 'Federal', pages: 2 },
  { id: 'f4', name: 'W-2', description: "Wage and Tax Statement Summary", category: 'Federal', pages: 1 },
  { id: 's1', name: 'DE 4', description: "California Employee Withholding Certificate", category: 'State', state: 'California', pages: 4 },
  { id: 's2', name: 'Form 540', description: "California Resident Income Tax Return", category: 'State', state: 'California', pages: 5 },
  { id: 's3', name: 'IT-201', description: "New York Resident Income Tax Return", category: 'State', state: 'New York', pages: 4 },
  { id: 's4', name: 'IT-2104', description: "New York Employee Withholding Allowance", category: 'State', state: 'New York', pages: 4 }
];

const SHUTDOWNS: Shutdown[] = [
  {
    id: 'shutdown2025',
    name: 'Government Shutdown of Late 2025',
    startDate: '2025-09-30T00:00:00',
    endDate: '2025-10-20T00:00:00',
    economicCost: '$1.6 Trillion',
    jobsAffected: '~880,000 Furloughed',
    description: 'Triggered by a congressional impasse over federal budget programs for Fiscal 2026. Key disputes revolved around infrastructure investments and regulatory adjustments. An estimated $1.6 Trillion was lost in dynamic federal economic output.'
  },
  {
    id: 'shutdown2018',
    name: '2018–2019 Government Shutdown',
    startDate: '2018-12-22T00:00:00',
    endDate: '2019-01-25T00:00:00',
    economicCost: '$11 Billion',
    jobsAffected: '~800,000 Furloughed',
    description: 'The longest U.S. government shutdown in historical records, stemming from a debate over southern border barrier funding appropriations.'
  },
  {
    id: 'shutdown2013',
    name: '2013 Government Shutdown',
    startDate: '2013-10-01T00:00:00',
    endDate: '2013-10-17T00:00:00',
    economicCost: '$24 Billion',
    jobsAffected: '~850,000 Furloughed',
    description: 'Prompted by legislative battles surrounding initial implementation timelines for the Affordable Care Act (ACA).'
  }
];

const SHUTDOWN_FAQS = [
  { question: "What is a federal government shutdown?", answer: "A government shutdown occurs when Congress fails to pass regular appropriations bills or a continuing resolution (CR) to fund federal agencies, halting all non-essential government activities." },
  { question: "Are essential employees required to work?", answer: "Yes. Essential personnel (e.g. military, air traffic control, law enforcement) continue working but do not receive payment until funding is legally restored." },
  { question: "Do federal employees receive back-pay?", answer: "Historically, Congress always passes retroactive pay bills to satisfy back salaries of both furloughed and active employees after reopening." }
];

const TIME_ZONES: TimeZone[] = [
  { label: 'ET', timeZone: 'America/New_York' },
  { label: 'CT', timeZone: 'America/Chicago' },
  { label: 'MT', timeZone: 'America/Denver' },
  { label: 'PT', timeZone: 'America/Los_Angeles' },
  { label: 'AKT', timeZone: 'America/Anchorage' },
  { label: 'HST', timeZone: 'Pacific/Honolulu' },
];


// ================= CUSTOM REACT HOOKS =================
const useLiveTime = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);
  return TIME_ZONES.map(({ label, timeZone }) => ({
    label,
    time: time.toLocaleTimeString('en-US', {
      timeZone, hour: '2-digit', minute: '2-digit', hour12: true
    }).replace(' ', '')
  }));
};

const useCountdown = (targetDate: string) => {
  const countDate = new Date(targetDate).getTime();
  const [left, setLeft] = useState(countDate - new Date().getTime());
  useEffect(() => {
    const timer = setInterval(() => setLeft(countDate - new Date().getTime()), 1000);
    return () => clearInterval(timer);
  }, [countDate]);

  if (left < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(left / (1000 * 60 * 60 * 24)),
    hours: Math.floor((left % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((left % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((left % (1000 * 60)) / 1000)
  };
};

const useAnimatedCounter = (endValue: number, duration: number = 1500) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimes: number;
    let frameId: number;
    const run = (timestamp: number) => {
      if (!startTimes) startTimes = timestamp;
      const elapsed = timestamp - startTimes;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * endValue));
      if (elapsed < duration) {
        frameId = requestAnimationFrame(run);
      } else {
        setCount(endValue);
      }
    };
    frameId = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frameId);
  }, [endValue, duration]);
  return count;
};


// ================= COMMON COMPONENTS =================
const TimeZoneBar = () => {
  const times = useLiveTime();
  return (
    <div className="bg-blue-800 text-white text-xs py-2 px-4 shadow-inner">
      <div className="container mx-auto flex flex-wrap gap-4 justify-center font-mono">
        {times.map(({ label, time }) => (
          <div key={label} className="flex items-center">
            <span className="font-semibold text-blue-200">{label}:</span>
            <span className="ml-1 text-white">{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface BannerProps {
  onNavigate: (path: string) => void;
}

const Banner: React.FC<BannerProps> = ({ onNavigate }) => {
  return (
    <div className="bg-yellow-400 text-black py-2 px-4 text-center text-sm font-semibold animate-pulse border-b border-yellow-500">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <i className="ri-error-warning-line text-red-700 text-lg"></i>
        <span>Lapse in appropriations: Selected federal services may face delays.</span>
        <button onClick={() => onNavigate('shutdowns')} className="underline hover:text-red-700 ml-1">
          View Shutdown Schedules
        </button>
      </div>
    </div>
  );
};

interface HeaderProps {
  current_page: string;
  onNavigate: (path: string) => void;
  bookmarkedCount: number;
}

const NavigationHeader: React.FC<HeaderProps> = ({ current_page, onNavigate, bookmarkedCount }) => {
  const [mobOpen, setMobOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);

  const linkStyle = (page: string) =>
    `px-3 py-2 rounded-md text-sm font-semibold transition-all ${
      current_page === page ? 'bg-blue-700 text-white' : 'text-gray-100 hover:bg-blue-600'
    }`;

  return (
    <header className="bg-brand-dark-blue shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="bg-white p-2 rounded flex items-center justify-center">
              <i className="ri-government-fill text-brand-blue text-xl"></i>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-white leading-tight">USAJobs Portal</h1>
              <p className="text-[10px] text-gray-300">National Employment Gateway</p>
            </div>
          </div>

          {/* Desktop Tabs */}
          <nav className="hidden lg:flex space-x-2">
            <button onClick={() => onNavigate('/')} className={linkStyle('/')}>Home</button>
            <button onClick={() => onNavigate('jobs')} className={linkStyle('jobs')}>Browse Jobs</button>
            <button onClick={() => onNavigate('applications')} className={linkStyle('applications')}>My Applications</button>
            <button onClick={() => onNavigate('profile')} className={linkStyle('profile')}>My Profile</button>
            <button onClick={() => onNavigate('tax-documents')} className={linkStyle('tax-documents')}>Tax Documents</button>
            <button onClick={() => onNavigate('shutdowns')} className={linkStyle('shutdowns')}>Gov Shutdowns</button>
          </nav>

          {/* Right Alerts & Profile */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setAlertsOpen(!alertsOpen)}
                className="flex items-center text-sm bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded transition-all"
              >
                <i className="ri-notification-3-line mr-2"></i>
                <span>Alerts</span>
                <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">2</span>
              </button>
              {alertsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-2xl py-2 border text-gray-800 text-xs z-50">
                  <div className="px-4 py-2 font-bold border-b text-gray-700">Important Notifications</div>
                  <div className="p-3 border-b hover:bg-gray-50 cursor-pointer" onClick={() => { onNavigate('shutdowns'); setAlertsOpen(false); }}>
                    <span className="text-red-600 font-semibold">Shutdown Risk Elevated:</span> Potential appropriations freeze monitoring active.
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer" onClick={() => { onNavigate('profile'); setAlertsOpen(false); }}>
                    <span className="text-brand-blue font-semibold">Profile Action:</span> Claim Veteran’s Preferences to expand qualification scores.
                  </div>
                </div>
              )}
            </div>
            <button className="bg-brand-blue hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded text-sm shadow transition-all" onClick={() => alert('Secure verification flow simulated.')}>
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobOpen(!mobOpen)} className="lg:hidden text-white focus:outline-none">
            <i className={mobOpen ? "ri-close-line text-2xl" : "ri-menu-line text-2xl"}></i>
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobOpen && (
        <div className="lg:hidden bg-brand-dark-blue border-t border-blue-900 py-3 space-y-1">
          {['/', 'jobs', 'applications', 'profile', 'tax-documents', 'shutdowns'].map(p => (
            <button
              key={p}
              onClick={() => { onNavigate(p); setMobOpen(false); }}
              className="block w-full text-left px-6 py-2.5 text-sm text-gray-200 hover:bg-blue-800"
            >
              {p === '/' ? 'Home' : p.replace('-', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};


// ================= PAGE IMPLEMENTATIONS =================

// --- HOME PAGE ---
const HomePage: React.FC<BannerProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-dark-blue to-blue-900 text-white py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="bg-blue-800 text-blue-200 text-xs font-bold font-mono px-3.5 py-1.5 rounded-full uppercase tracking-widest">
            Official Federal & Private Sector Gateway
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mt-5 leading-tight tracking-tight">
            Discover Your Next Career in Public Service
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join millions of civil servants who secure federal pensions, premium healthcare benefits, and make direct impacts serving the United States.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => onNavigate('jobs')} className="w-full sm:w-auto bg-brand-red hover:bg-red-600 text-white font-bold py-3.5 px-8 rounded-lg shadow-lg text-md transition-all flex items-center justify-center">
              Browse All Open Jobs <i className="ri-arrow-right-line ml-2"></i>
            </button>
            <button onClick={() => onNavigate('profile')} className="w-full sm:w-auto bg-transparent border border-white hover:bg-white hover:text-brand-dark-blue font-bold py-3.5 px-8 rounded-lg text-md transition-all flex items-center justify-center">
              Configure Vet Preferences
            </button>
          </div>
        </div>
      </section>

      {/* Numbers block */}
      <section className="bg-brand-dark-blue text-white py-12 border-t border-blue-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h4 className="text-4xl font-bold text-yellow-400 font-display">15,000+</h4>
              <p className="text-gray-400 text-sm mt-1">Live Job Listings</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-yellow-400 font-display">2.1M</h4>
              <p className="text-gray-400 text-sm mt-1">Active Personnel</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-yellow-400 font-display">100+</h4>
              <p className="text-gray-400 text-sm mt-1">Federal Agencies</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold text-yellow-400 font-display">500+</h4>
              <p className="text-gray-400 text-sm mt-1">Career Fields</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Process Roadmap */}
      <section className="py-16 bg-white border-b">
        <div className="container mx-auto px-4 max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-800 font-display">Simple 3-Step Hiring Protocol</h3>
          <p className="text-gray-600 text-center mt-2 max-w-xl mx-auto">Our streamlined onboarding handles preference multipliers and security verifications directly.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 border rounded-lg bg-gray-50 text-center relative shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-light-blue text-brand-blue flex items-center justify-center mx-auto text-xl font-bold mb-4 font-display">1</div>
              <h4 className="text-lg font-bold text-gray-800">Complete Profile</h4>
              <p className="text-sm text-gray-500 mt-2">Claim veteran preference scores and attach certified federal resumes.</p>
            </div>
            <div className="p-6 border rounded-lg bg-gray-50 text-center relative shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-light-blue text-brand-blue flex items-center justify-center mx-auto text-xl font-bold mb-4 font-display">2</div>
              <h4 className="text-lg font-bold text-gray-800">Advanced Filters</h4>
              <p className="text-sm text-gray-500 mt-2">Filter by precise job sector classifications, pay scales, and security clearance types.</p>
            </div>
            <div className="p-6 border rounded-lg bg-gray-50 text-center relative shadow-sm">
              <div className="w-12 h-12 rounded-full bg-brand-light-blue text-brand-blue flex items-center justify-center mx-auto text-xl font-bold mb-4 font-display">3</div>
              <h4 className="text-lg font-bold text-gray-800">Direct Delivery</h4>
              <p className="text-sm text-gray-500 mt-2">State-of-the-art secure transmission route pushes files to specific human resources officers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Holiday Calendar Teaser */}
      <section className="py-16 bg-gray-50 border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="bg-red-100 text-red-800 font-bold px-3 py-1 rounded text-xs uppercase tracking-wider font-mono">Next Public Onboarding Holiday</span>
              <h3 className="text-2xl font-bold font-display text-red-900 mt-2">Labor Day 2026</h3>
              <p className="text-red-700 text-sm mt-1">Official Holiday Calendar tracks all statutory holiday leaves automatically.</p>
            </div>
            <button onClick={() => onNavigate('shutdowns')} className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-md transition-all whitespace-nowrap">
              View Holiday Calendar
            </button>
          </div>
        </div>
      </section>

      {/* Agency Partners Logos */}
      <section className="py-16 bg-white text-center">
        <div className="container mx-auto px-4 max-w-5xl">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest font-mono">Federal Partners Gateway</h4>
          <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
            {AGENCIES.slice(0, 5).map(agency => (
              <div key={agency.abbr} className="bg-gray-100 text-gray-700 font-display font-semibold transition-all hover:bg-brand-blue hover:text-white px-5 py-3.5 rounded border border-gray-200 cursor-pointer shadow-sm text-center" onClick={() => onNavigate('jobs')}>
                <div className="font-bold text-md">{agency.abbr}</div>
                <div className="text-[10px] opacity-75 mt-0.5">{agency.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// --- JOBS PAGE WITH ADVANCED FILTERS ---
interface JobsPageProps {
  onNavigate: (path: string) => void;
  onBookmark: (jobId: string) => void;
  bookmarkedJobs: string[];
}

const JobsPage: React.FC<JobsPageProps> = ({ onNavigate, onBookmark, bookmarkedJobs }) => {
  const [sector, setSector] = useState('All');
  const [payGrade, setPayGrade] = useState('Any');
  const [clearance, setClearance] = useState('Any');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return INITIAL_JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) || 
                           (job.agency && job.agency.toLowerCase().includes(search.toLowerCase())) ||
                           (job.company && job.company.toLowerCase().includes(search.toLowerCase()));
      const matchesSector = sector === 'All' || job.sector === sector;
      const matchesPay = payGrade === 'Any' || job.payGrade === payGrade;
      const matchesClearance = clearance === 'Any' || 
        (clearance === 'None' && job.securityClearance.toLowerCase().includes('none')) ||
        (clearance === 'Secret' && job.securityClearance.toLowerCase().includes('secret')) ||
        (clearance === 'Top Secret' && (job.securityClearance.toLowerCase().includes('top secret') && !job.securityClearance.toLowerCase().includes('sci'))) ||
        (clearance === 'Top Secret/SCI' && job.securityClearance.toLowerCase().includes('sci')) ||
        (clearance === 'Public Trust' && job.securityClearance.toLowerCase().includes('public trust'));

      return matchesSearch && matchesSector && matchesPay && matchesClearance;
    });
  }, [search, sector, payGrade, clearance]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-800 font-display">Federal & Private Job Directory</h2>
        <p className="text-gray-500 text-sm mt-1 mb-8">Utilize strict clearance criteria to filter appropriate agency rosters.</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Search & Filter Left Column */}
          <aside className="bg-white p-6 rounded-xl border shadow-sm h-fit">
            <h3 className="font-bold text-gray-800 border-b pb-3 mb-5 text-lg flex items-center">
              <i className="ri-filter-3-line text-brand-blue mr-2"></i> Filter Systems
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase">Interactive Search</label>
                <div className="relative mt-1.5">
                  <input 
                    type="text" 
                    value={search} 
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search agency, title..." 
                    className="w-full text-sm pl-9 pr-4 py-2 border rounded-md focus:ring-1 focus:ring-brand-blue outline-none"
                  />
                  <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase">Sector Type</label>
                <select value={sector} onChange={e => setSector(e.target.value)} className="w-full text-sm mt-1.5 p-2 bg-white border rounded focus:ring-1 focus:ring-brand-blue outline-none">
                  <option value="All">All Sectors</option>
                  <option value="Government">Government Sector Only</option>
                  <option value="Private">Private Sector Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase">Pay Scale Level (GS)</label>
                <select value={payGrade} onChange={e => setPayGrade(e.target.value)} className="w-full text-sm mt-1.5 p-2 bg-white border rounded focus:ring-1 focus:ring-brand-blue outline-none">
                  <option value="Any">All Pay Grades (GS-9 and above)</option>
                  <option value="GS-09">GS-09 Entry</option>
                  <option value="GS-11">GS-11 Senior Specialist</option>
                  <option value="GS-12">GS-12 Administrator</option>
                  <option value="GS-13">GS-13 Principal Analyst</option>
                  <option value="GS-14">GS-14 Lead Advisor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase">Security Mandates</label>
                <select value={clearance} onChange={e => setClearance(e.target.value)} className="w-full text-sm mt-1.5 p-2 bg-white border rounded focus:ring-1 focus:ring-brand-blue outline-none">
                  <option value="Any">Any Clearance</option>
                  <option value="None">None Required</option>
                  <option value="Public Trust">Public Trust Authorization</option>
                  <option value="Secret">Secret Clearance Level</option>
                  <option value="Top Secret">Top Secret Clearance Level</option>
                  <option value="Top Secret/SCI">Top Secret / SCI Compartmentalized</option>
                </select>
              </div>
            </div>

            <button 
              onClick={() => { setSector('All'); setPayGrade('Any'); setClearance('Any'); setSearch(''); }}
              className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 rounded text-xs transition-all"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Job Cards Column */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-600 font-semibold">{filtered.length} matching position files loaded.</p>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border shadow-sm">
                <i className="ri-error-warning-line text-4xl text-gray-400"></i>
                <p className="mt-4 text-gray-600 font-bold">No listed jobs match your specific clearance or pay profile.</p>
                <button onClick={() => { setSector('All'); setPayGrade('Any'); setClearance('Any'); setSearch(''); }} className="mt-2 text-brand-blue font-semibold hover:underline">
                  Restore all jobs list
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map(job => {
                  const isGov = job.sector === 'Government';
                  const isBookmarked = bookmarkedJobs.includes(job.id);
                  return (
                    <div key={job.id} className="bg-white rounded-xl border p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-200">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex flex-wrap gap-1.5">
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              isGov ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {job.sector}
                            </span>
                            {job.payGrade && (
                              <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                Scale: {job.payGrade}
                              </span>
                            )}
                          </div>
                          {job.companyLogo && (
                            <img src={job.companyLogo} alt="Logo" className="w-8 h-8 rounded border object-contain p-1" />
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mt-2 font-display leading-tight">{job.title}</h3>
                        <p className="text-brand-blue text-sm font-semibold mt-1">
                          {isGov ? job.agency : job.company}
                        </p>

                        <div className="border-t border-dashed my-4 pt-3 space-y-2 text-xs text-gray-600">
                          <div className="flex items-center">
                            <i className="ri-map-pin-line mr-2 text-gray-400"></i>
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-money-dollar-circle-line mr-2 text-green-600 font-bold"></i>
                            <span className="text-green-700 font-semibold">{job.salary}</span>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-shield-line mr-2 text-red-600"></i>
                            <span>{job.securityClearance}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t flex gap-2">
                        <button 
                          onClick={() => onNavigate(`apply-${job.id}`)}
                          className="flex-grow bg-brand-blue hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-xs transition-all text-center"
                        >
                          Application Portal
                        </button>
                        <button 
                          onClick={() => onBookmark(job.id)}
                          className={`p-2 border rounded hover:bg-gray-50 transition-all ${isBookmarked ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-400'}`}
                        >
                          <i className={isBookmarked ? "ri-bookmark-fill" : "ri-bookmark-line"}></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

// --- COMPREHENSIVE APPLY PAGE (MULTI-STEP) ---
interface ApplyPageProps {
  jobId: string;
  onNavigate: (path: string) => void;
  onSubmitApplication: (app: Application) => void;
}

const ApplyPage: React.FC<ApplyPageProps> = ({ jobId, onNavigate, onSubmitApplication }) => {
  const job = INITIAL_JOBS.find(j => j.id === jobId);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    first: '', last: '', email: '', phone: '',
    hasFeds: 'No', vetPref: 'None', clearanceAuth: 'No',
    empHistory: '', eduHistory: ''
  });

  if (!job) {
    return (
      <div className="container mx-auto py-16 px-4 text-center max-w-md">
        <i className="ri-alert-line text-4xl text-gray-400"></i>
        <p className="mt-4 text-gray-700">Specified job identifier could not be validated on the registry.</p>
        <button onClick={() => onNavigate('jobs')} className="mt-4 text-brand-blue underline font-bold">Return to Jobs Directory</button>
      </div>
    );
  }

  const isGov = job.sector === 'Government';
  const stepsList = isGov 
    ? ['Contact info', 'Federal Employment History', 'Veteran Preferences', 'Clearance Attestation', 'Declaration Review']
    : ['Personal Profile', 'Full Work History', 'Educational Credentials', 'Security Background', 'Application Review'];

  const handleSave = (field: string, val: string) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSubmit = () => {
    const newApp: Application = {
      id: String(Date.now()),
      jobTitle: job.title,
      agency: isGov ? (job.agency || '') : (job.company || ''),
      refId: isGov ? `${job.payGrade}-APP-${Math.floor(Math.random() * 9000 + 1000)}` : `PRIV-APP-${Math.floor(Math.random() * 9000 + 1000)}`,
      status: 'Application Received',
      statusColor: 'bg-blue-400',
      nextStep: 'Awaiting background registry verification.',
      deadline: job.deadline
    };
    onSubmitApplication(newApp);
    alert('Your official application documentation has been safely compiled and pushed to HR files!');
    onNavigate('applications');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white p-8 rounded-xl border shadow-lg">
          <div className="border-b pb-4 mb-6">
            <span className="text-[10px] font-bold text-gray-500 uppercase font-mono">Form Protocol SF-86 Subsector Ready</span>
            <h2 className="text-2xl font-bold text-gray-800 font-display">Apply: {job.title}</h2>
            <p className="text-sm text-brand-blue font-semibold">{isGov ? job.agency : job.company}</p>
          </div>

          {/* Progress Indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {stepsList.map((stLabel, idx) => (
                <React.Fragment key={stLabel}>
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      idx <= step ? 'bg-brand-blue text-white shadow-md' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {idx < step ? '✓' : idx + 1}
                    </div>
                    <span className={`text-[9px] mt-1.5 font-bold uppercase hidden md:inline tracking-wider ${idx <= step ? 'text-brand-blue' : 'text-gray-400'}`}>
                      {stLabel.split(' ')[0]}
                    </span>
                  </div>
                  {idx < stepsList.length - 1 && (
                    <div className={`flex-grow h-1 mx-2 rounded transition-all ${idx < step ? 'bg-brand-blue' : 'bg-gray-200'}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[240px] bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h4 className="text-md font-bold text-gray-800 mb-4 uppercase tracking-wider text-xs border-b pb-2 text-gray-500">
              Step {step + 1}: {stepsList[step]}
            </h4>

            {step === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <label className="text-gray-700">First Name</label>
                  <input type="text" value={formData.first} onChange={e => handleSave('first', e.target.value)} placeholder="John" className="w-full mt-1.5 p-2 bg-white border rounded" />
                </div>
                <div>
                  <label className="text-gray-700">Last Name</label>
                  <input type="text" value={formData.last} onChange={e => handleSave('last', e.target.value)} placeholder="Doe" className="w-full mt-1.5 p-2 bg-white border rounded" />
                </div>
                <div>
                  <label className="text-gray-700">Social Electronic Email</label>
                  <input type="email" value={formData.email} onChange={e => handleSave('email', e.target.value)} placeholder="johndoe@email.gov" className="w-full mt-1.5 p-2 bg-white border rounded" />
                </div>
                <div>
                  <label className="text-gray-700">Phone Contact Number</label>
                  <input type="tel" value={formData.phone} onChange={e => handleSave('phone', e.target.value)} placeholder="(202) 555-0199" className="w-full mt-1.5 p-2 bg-white border rounded" />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4 text-xs font-semibold">
                {isGov ? (
                  <div>
                    <label className="text-gray-700">Do you possess prior GS (General Schedule) federal employment records?</label>
                    <select value={formData.hasFeds} onChange={e => handleSave('hasFeds', e.target.value)} className="w-full mt-2 p-2 bg-white border rounded">
                      <option value="No">No, I have only private sector status history</option>
                      <option value="Yes">Yes, I am reinstatement eligible or former contractor/employee</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="text-gray-700">Summarize major work history achievements</label>
                    <textarea rows={4} value={formData.empHistory} onChange={e => handleSave('empHistory', e.target.value)} placeholder="Provide role, key duties, and milestones..." className="w-full mt-1.5 p-2 bg-white border rounded font-mono text-xs"></textarea>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 text-xs font-semibold">
                {isGov ? (
                  <div>
                    <label className="text-gray-700">Claim Veteran preference categories</label>
                    <select value={formData.vetPref} onChange={e => handleSave('vetPref', e.target.value)} className="w-full mt-2 p-2 bg-white border rounded text-xs">
                      <option value="None">None claimable</option>
                      <option value="5-point">5-Point Preference (Honorable Discharge)</option>
                      <option value="10-point-disability">10-Point Preference (Service Connected Disability rating)</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="text-gray-700">Highest Education Degree Attained</label>
                    <input type="text" value={formData.eduHistory} onChange={e => handleSave('eduHistory', e.target.value)} placeholder="e.g. MS in Systems Engineering, Georgia Tech" className="w-full mt-1.5 p-2 bg-white border rounded" />
                  </div>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 text-xs font-semibold">
                <label className="text-gray-700">Do you assert willingness to complete a strict federal drug test & security background check?</label>
                <select value={formData.clearanceAuth} onChange={e => handleSave('clearanceAuth', e.target.value)} className="w-full mt-1.5 p-2 bg-white border rounded">
                  <option value="Yes">Yes, I am willing immediately</option>
                  <option value="No">No, I request exemptions</option>
                </select>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-3 text-xs text-gray-700">
                <p className="font-semibold">Verify the correct parameters before submission authorization:</p>
                <div className="p-3 bg-white rounded border space-y-1 font-mono text-[10px]">
                  <div><strong className="text-gray-500">Applicant:</strong> {formData.first || 'N/A'} {formData.last || 'N/A'}</div>
                  <div><strong className="text-gray-500">Contact Email:</strong> {formData.email || 'N/A'}</div>
                  <div><strong className="text-gray-500">Cleared/Attested:</strong> {formData.clearanceAuth || 'N/A'}</div>
                  <div><strong className="text-gray-500">Vets Scale Claim:</strong> {formData.vetPref || 'N/A'}</div>
                </div>
                <p className="text-[10px] text-gray-500 italic mt-3">Under penalty of 18 U.S.C. § 1001, I assert all stated details represent actual authentic qualifications.</p>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-6 pt-4 border-t flex justify-between">
            <button 
              onClick={() => setStep(p => Math.max(p - 1, 0))}
              disabled={step === 0}
              className="bg-gray-200 text-gray-700 py-1.5 px-4 rounded text-xs font-bold disabled:opacity-40 transition-all"
            >
              Back
            </button>
            {step < stepsList.length - 1 ? (
              <button 
                onClick={() => setStep(p => p + 1)}
                className="bg-brand-blue hover:bg-blue-600 text-white py-1.5 px-4 rounded text-xs font-bold transition-all"
              >
                Next Step
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-5 rounded text-xs font-bold shadow-md transition-all"
              >
                Certify & Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MY APPLICATIONS PAGE ---
interface ApplicationsPageProps {
  applications: Application[];
  onRemoveApplication: (id: string) => void;
}

const ApplicationsPage: React.FC<ApplicationsPageProps> = ({ applications, onRemoveApplication }) => {
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = useMemo(() => {
    if (filterStatus === 'All') return applications;
    return applications.filter(a => a.status === filterStatus);
  }, [applications, filterStatus]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-gray-800 font-display">My Application Dossiers</h1>
        <p className="text-gray-500 text-sm mt-1 mb-8">Live status log synchronised with the federal personnel management portal.</p>

        <div className="bg-white p-4 rounded-xl border shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="text-xs font-bold text-gray-600 uppercase">
            ACTIVE DOSSIERS: {filtered.length} File Registers
          </span>
          <select 
            value={filterStatus} 
            onChange={e => setFilterStatus(e.target.value)}
            className="p-1 px-2 text-xs border rounded bg-white font-semibold text-gray-700 outline-none"
          >
            <option value="All">All Applied States</option>
            <option value="Under Review">Under Review</option>
            <option value="Interview Scheduled">Interview Scheduled</option>
            <option value="Referred">Referred</option>
            <option value="Not Selected">Not Selected</option>
            <option value="Application Received">Application Received</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white p-16 text-center border rounded-xl shadow-inner text-gray-400 font-display">
            <i className="ri-folder-open-line text-4xl mb-3 block"></i>
            No applications exist under this specific status filter.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(app => (
              <div key={app.id} className="bg-white rounded-xl border p-5 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800 leading-tight pr-5">{app.jobTitle}</h3>
                      <p className="text-xs text-brand-blue font-semibold mt-0.5">{app.agency}</p>
                      <span className="text-[9px] font-mono font-bold text-gray-400 block mt-2">Dossier: #{app.refId}</span>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-white uppercase whitespace-nowrap ${
                      app.status === 'Interview Scheduled' ? 'bg-green-600' :
                      app.status === 'Not Selected' ? 'bg-red-600' :
                      app.status === 'Under Review' ? 'bg-yellow-500 text-black' : 'bg-brand-blue'
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="border-t border-dashed mt-4 pt-3 text-xs">
                    <p className="text-gray-500 font-semibold uppercase text-[9px] tracking-wider">Operational Next Step:</p>
                    <p className="text-gray-700 font-medium mt-1 leading-snug">{app.nextStep}</p>
                    <span className="text-[10px] text-gray-400 block mt-2">Reg Deadline: {app.deadline}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-[10px] font-semibold">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded transition-all text-center" onClick={() => alert('HR contact portal secured. Awaiting connection lines.')}>
                    Contact HR
                  </button>
                  <button 
                    onClick={() => onRemoveApplication(app.id)}
                    className="bg-red-50 hover:bg-red-100 text-red-700 py-1 px-2 rounded border border-red-100 transition-all text-center"
                  >
                    Cancel File
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- PROFILE PAGE WITH VETERAN SELECTION ---
const ProfilePage = () => {
  const [isVet, setIsVet] = useState('No');
  const [preferenceType, setPreferenceType] = useState('None');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 font-display">Applicant Profile Management</h1>
        <p className="text-gray-500 text-sm mt-1 mb-8">Maintain premium claims files and military verification codes safely.</p>

        {saved && (
          <div className="bg-green-100 border border-green-200 text-green-800 py-3 px-4 rounded-lg mb-6 text-sm font-semibold flex items-center gap-2">
            <i className="ri-checkbox-circle-line text-lg"></i> Profile settings verified and saved inside national servers.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preference Claims Panel & Settings */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4 font-display flex items-center">
                <i className="ri-medal-line text-yellow-500 mr-2"></i> Vet Claims & Preference Multiplier
              </h2>
              <p className="text-xs text-gray-500 mb-5">By claiming priority, applicant receives additional GS points towards final recruitment registers.</p>
              
              <div className="space-y-4 text-xs font-semibold">
                <div>
                  <label className="text-gray-700">Are you a veteran of the US armed forces?</label>
                  <select value={isVet} onChange={e => setIsVet(e.target.value)} className="w-full mt-1.5 p-2 bg-white border rounded">
                    <option value="No">No, I claim non-military status</option>
                    <option value="Yes">Yes, I am a preference-eligible veteran (Form DD-214 active)</option>
                  </select>
                </div>

                {isVet === 'Yes' && (
                  <div>
                    <label className="text-gray-700">Specific Preference Scheme</label>
                    <select value={preferenceType} onChange={e => setPreferenceType(e.target.value)} className="w-full mt-1.5 p-2 bg-white border rounded">
                      <option value="None">None selected</option>
                      <option value="5-point">5-Point Preference (TP: Honorable Service)</option>
                      <option value="10-point-disability">10-Point Preference (XP: Veteran with 30%+ disability rate)</option>
                      <option value="10-point-other">10-Point Preference (CP: Purple Heart recipient)</option>
                    </select>
                  </div>
                )}

                <div className="border border-dashed p-4 rounded bg-gray-50 text-center">
                  <i className="ri-upload-cloud-2-line text-3xl text-gray-400"></i>
                  <p className="text-xs font-bold text-gray-600 mt-2">Attach official DD-214 Separation Documents</p>
                  <p className="text-[10px] text-gray-400 mt-1">Accepting PDF, DOCX up to 15MB securely</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4 font-display flex items-center">
                <i className="ri-compass-3-line text-brand-blue mr-2"></i> Search Scope Preferences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                <div>
                  <label className="text-gray-700">Preferred State Location</label>
                  <input type="text" placeholder="e.g. Washington, DC; Remote" className="w-full mt-1.5 p-2 bg-white border rounded outline-none text-xs" />
                </div>
                <div>
                  <label className="text-gray-700">Preferred Agencies</label>
                  <input type="text" placeholder="e.g. Department of Navy, NASA" className="w-full mt-1.5 p-2 bg-white border rounded outline-none text-xs" />
                </div>
              </div>
            </div>
          </div>

          {/* Doc Management Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border shadow-sm text-xs font-semibold">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4 font-display flex items-center">
                <i className="ri-folder-info-line text-brand-blue mr-2"></i> Active Registers
              </h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded border">
                  <span className="font-mono text-[10px] text-gray-600">Resume_Certified_2026.pdf</span>
                  <a href="#" onClick={e => e.preventDefault()} className="text-blue-600 hover:underline text-[9px]">Down</a>
                </li>
                <li className="flex justify-between items-center p-2 bg-gray-50 rounded border">
                  <span className="font-mono text-[10px] text-gray-600">CoverLetter_Federal v3.pdf</span>
                  <a href="#" onClick={e => e.preventDefault()} className="text-blue-600 hover:underline text-[9px]">Down</a>
                </li>
              </ul>
              <button className="w-full mt-3 bg-blue-50 text-brand-blue hover:bg-blue-100 py-1.5 rounded text-xs" onClick={() => alert('Secure document upload pipeline ready.')}>
                Upload New File
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl border shadow-sm text-xs">
              <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4 font-display flex items-center">
                <i className="ri-mail-settings-line mr-2 text-brand-blue"></i> Alerts Setup
              </h2>
              <div className="space-y-3 font-semibold text-gray-600">
                <label className="flex items-center"><input type="checkbox" defaultChecked className="mr-2"/> Status transition update emails</label>
                <label className="flex items-center"><input type="checkbox" className="mr-2"/> High-priority shutdown alarm memos</label>
              </div>
            </div>

            <button onClick={handleSave} className="w-full bg-brand-blue hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl shadow transition-all">
              Verify All Claims & Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- TAX DOCUMENTS PAGE ---
const TaxDocumentsPage = () => {
  const [search, setSearch] = useState('');
  const [categ, setCateg] = useState('All');
  const [selectedState, setSelectedState] = useState('All');

  const states = ['All', 'California', 'New York'];

  const filtered = useMemo(() => {
    return TAX_FORMS.filter(f => {
      const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase()) || f.description.toLowerCase().includes(search.toLowerCase());
      const matchesCateg = categ === 'All' || f.category === categ;
      const matchesState = selectedState === 'All' || f.state === selectedState || f.category === 'Federal';
      return matchesSearch && matchesCateg && matchesState;
    });
  }, [search, categ, selectedState]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-gray-800 font-display">Federal & State Tax Documents</h1>
        <p className="text-gray-500 text-sm mt-1 mb-8">Maintain structural verification of tax form records to declare appropriate income.</p>

        {/* Filters Block */}
        <div className="bg-white p-5 rounded-xl border shadow-sm mb-6 sticky top-20 z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <input 
                type="text" 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                placeholder="Search W-4, I-9, State Forms..." 
                className="w-full text-xs pl-9 pr-4 py-2.5 border rounded outline-none bg-gray-50 focus:bg-white transition-all"
              />
              <i className="ri-search-line absolute left-3 top-3 text-gray-400"></i>
            </div>
            <div>
              <select value={categ} onChange={e => setCateg(e.target.value)} className="w-full p-2.5 text-xs bg-white border rounded outline-none font-semibold text-gray-700">
                <option value="All">All Classifications</option>
                <option value="Federal">Federal Income Forms</option>
                <option value="State">State Specific Forms</option>
              </select>
            </div>
            <div>
              <select value={selectedState} onChange={e => setSelectedState(e.target.value)} className="w-full p-2.5 text-xs bg-white border rounded outline-none font-semibold text-gray-700">
                <option value="All">All States</option>
                {states.slice(1).map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{filtered.length} tax sheets loaded.</p>
          <button onClick={() => alert('Initiating secure package bulk download routine.')} className="bg-brand-blue text-white font-bold py-1.5 px-4 rounded text-xs hover:bg-blue-600 transition-all">
            <i className="ri-download-line mr-1.5"></i> Package Download
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(form => (
            <div key={form.id} className="bg-white p-5 rounded-xl border shadow-sm flex justify-between items-center hover:shadow-md transition-all">
              <div>
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  form.category === 'Federal' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {form.category}{form.state ? `: ${form.state}` : ''}
                </span>
                <h3 className="font-bold text-gray-800 text-sm mt-3 font-display leading-tight">{form.name}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{form.description}</p>
                <span className="text-[10px] text-gray-400 block mt-2 font-mono font-bold">{form.pages} certified pages</span>
              </div>
              <button onClick={() => alert(`Starting download secure server connection for ${form.name}`)} className="p-2.5 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-brand-blue border rounded-full transition-all">
                <i className="ri-download-line text-md"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- GOVERNMENT SHUTDOWNS INFORMATION PAGE ---
const ShutdownsPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeCostValue = 1638600000000; // LOSS MOCK DATA
  const animatedCost = useAnimatedCounter(activeCostValue);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Alert Header block */}
        <div className="bg-red-800 text-white rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden mb-10">
          <div className="absolute right-0 top-0 opacity-10 font-display font-bold text-8xl text-white transform translate-x-12 -translate-y-8 pointer-events-none">USA</div>
          <i className="ri-alert-fill text-5xl text-yellow-400 block animate-pulse mx-auto"></i>
          <h1 className="text-3xl font-bold font-display mt-4">Departmental Appropriations Lapse Register</h1>
          <p className="text-red-200 text-xs mt-1 leading-relaxed max-w-2xl mx-auto">
            Providing full statutory reference logs on funding disputes, and essential service shutdown guidelines active across federal facilities.
          </p>
        </div>

        {/* Loss Counters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border rounded-xl p-6 text-center shadow-md">
            <i className="ri-money-dollar-circle-fill text-3xl text-red-600 block mb-2"></i>
            <h3 className="text-2xl font-bold text-brand-dark-blue font-mono">
              ${ (animatedCost / 1e12).toFixed(2) } Trillion
            </h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1.5">Estimated Economic Loss on Open Account</p>
          </div>
          <div className="bg-white border rounded-xl p-6 text-center shadow-md">
            <i className="ri-user-unfollow-line text-3xl text-red-600 block mb-2"></i>
            <h3 className="text-2xl font-bold text-brand-dark-blue font-mono">
              880,000+ Officers
            </h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1.5">Staff Furloughed Worldwide</p>
          </div>
        </div>

        {/* Historic Timelines */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-5 font-display flex items-center">
            <i className="ri-history-line text-brand-blue mr-2"></i> Historical Shutdown Log Ledger
          </h2>
          <div className="space-y-6">
            {SHUTDOWNS.map(st => {
              const daysDiff = Math.ceil(Math.abs(new Date(st.endDate).getTime() - new Date(st.startDate).getTime()) / (1000 * 60 * 60 * 24));
              return (
                <div key={st.id} className="bg-white p-6 border rounded-xl shadow-sm hover:shadow-md transition-all text-left">
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <h3 className="text-md font-bold text-gray-800 font-display">{st.name}</h3>
                    <span className="text-[10px] font-mono font-bold bg-red-100 text-red-800 px-2 py-0.5 rounded">Duration: {daysDiff} Days</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1 flex gap-2 font-semibold">
                    <span>Start: {st.startDate.substring(0,10)}</span>
                    <span>|</span>
                    <span>End: {st.endDate.substring(0,10)}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-3 leading-relaxed">{st.description}</p>
                  <div className="mt-4 pt-4 border-t border-dashed grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-400 font-bold block text-[9px] uppercase tracking-wider">Dynamic Cost:</span>
                      <span className="text-red-600 font-bold font-mono">{st.economicCost}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-bold block text-[9px] uppercase tracking-wider">Furloughs Affected:</span>
                      <span className="text-gray-700 font-bold font-mono">{st.jobsAffected}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordions */}
        <div className="bg-white p-6 rounded-xl border shadow-sm text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-6 font-display flex items-center">
            <i className="ri-questionnaire-line text-brand-blue mr-2"></i> Onboarding FAQ Answers
          </h2>
          <div className="space-y-4">
            {SHUTDOWN_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="border-b pb-3">
                  <button 
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center text-left py-2 font-semibold text-gray-800 text-sm focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <i className={`text-md text-gray-400 ri-arrow-down-s-line transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
                  </button>
                  {isOpen && (
                    <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-3 rounded border border-gray-100 leading-relaxed font-mono">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- LEGAL COMPONENT WITH UNIFIED SIDE NAVIGATION ---
interface LegalPageProps {
  section: string;
}

const LegalPage: React.FC<LegalPageProps> = ({ section }) => {
  const [activeSub, setActiveSub] = useState(section || 'privacy');

  const legalLinks = [
    { key: 'privacy', label: 'Privacy Policy' },
    { key: 'terms', label: 'Terms of Use' },
    { key: 'foia', label: 'FOIA Freedom of Info' },
    { key: 'fear', label: 'No FEAR Act Protection' },
    { key: 'equal', label: 'Equal Opportunity (EEO)' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen text-left">
      {/* Legal banner header */}
      <div className="bg-brand-dark-blue text-white py-10 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3">
            <i className="ri-scales-3-line text-brand-light-blue text-3xl"></i>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display">Statutory Compliance Bureau</h1>
              <p className="text-xs text-gray-300 mt-1">Official regulations and code citations guiding recruitment transparency.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Legal sub navigation sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-4 rounded-xl border shadow-sm sticky top-24">
              <h3 className="font-bold text-gray-700 text-xs uppercase tracking-widest pl-2.5 mb-3">Statutory Index</h3>
              <div className="space-y-1">
                {legalLinks.map(lk => (
                  <button
                    key={lk.key}
                    onClick={() => setActiveSub(lk.key)}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-md transition-all ${
                      activeSub === lk.key ? 'bg-blue-50 text-brand-blue' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {lk.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Sub-page detail content */}
          <main className="lg:col-span-3">
            <div className="bg-white p-8 rounded-xl border shadow-sm text-xs text-gray-700 leading-relaxed font-mono">
              {activeSub === 'privacy' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-brand-dark-blue font-display">Privacy Act Statement - 5 U.S.C. § 552a</h2>
                  <p className="text-gray-400 text-[10px]">Updated October 1, 2025</p>
                  <p>
                    USAJobs Portal is strictly committed to protecting the privacy of credentials. Storing credentials conforms to standard data safety frameworks. We operate with standard encryption arrays to block third party access.
                  </p>
                  <h4 className="font-bold text-gray-800 text-xs mt-4">1. Scope of Record Retainment</h4>
                  <p>
                    Your personal credentials including social security indexes, veteran discharge declarations (DD-214), career histories and resume documents are securely locked in restricted databases and transmitted only to accredited HR liaisons.
                  </p>
                </div>
              )}

              {activeSub === 'terms' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-brand-dark-blue font-display">Authorized Terms of Service Agreement</h2>
                  <p className="text-gray-400 text-[10px]">Updated October 1, 2025</p>
                  <p>
                    By accessing this employment directory network, user asserts commitment to provide exact, truthful information on career registers. Misrepresentations on federal hiring templates constitute felony acts.
                  </p>
                  <h4 className="font-bold text-gray-800 text-xs mt-4">2. Offenses and Penalties</h4>
                  <p>
                    Falsifying veteran qualification metrics triggers direct claims exclusion under Title 18 of United States Codification registers.
                  </p>
                </div>
              )}

              {activeSub === 'foia' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-brand-dark-blue font-display">Freedom of Information Act (FOIA) - 5 U.S.C. § 552</h2>
                  <p>
                    FOIA legislation allows citizen review of agency hiring procedures. Request templates can be routed directly to transparency agents across departmental networks.
                  </p>
                  <h4 className="font-bold text-gray-800 text-xs mt-4">National Security Clearance Exemption</h4>
                  <p>
                    Please note, certain inner operational directories or security-cleared program rosters are legally exempt from FOIA disclosure.
                  </p>
                </div>
              )}

              {activeSub === 'fear' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-brand-dark-blue font-display">The Federal No FEAR Act Protections</h2>
                  <p>
                    Ensures federal employers remain strictly liable for civil rights violations, whistleblowing retaliations, and regulatory discrimination checks.
                  </p>
                  <h4 className="font-bold text-gray-800 text-xs mt-4 font-display">Whistleblower Protection Standard</h4>
                  <p>
                    Avenue pipelines are guaranteed to preserve whistleblower safety when transmitting records of institutional fraud to oversight boards.
                  </p>
                </div>
              )}

              {activeSub === 'equal' && (
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-brand-dark-blue font-display">Equal Employment Opportunity (EEO) Policy</h2>
                  <p>
                    Hiring protocols claim structural neutrality. Selection metrics disregard race, religion, color, marital registries, gender status, age bracket, or physical disability.
                  </p>
                  <h4 className="font-bold text-gray-800 text-xs mt-4">Disability Workplace Adjustments</h4>
                  <p>
                    Federal agencies offer architectural and operational accommodations to secure comfortable, accessible workplace facilities for disabled officers.
                  </p>
                </div>
              )}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

// --- CHAT WITH US WIDGET ---
const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'Hello! I am USAJobs Support Agent. How may I guide your recruitment path today?' }
  ]);
  const [msgInput, setMsgInput] = useState('');

  const handleSend = () => {
    if(!msgInput.trim()) return;
    const userText = msgInput;
    setMessages(p => [...p, { sender: 'user', text: userText }]);
    setMsgInput('');

    // Simulated dynamic response based on keywords
    setTimeout(() => {
      let botReply = "I am processing your query. Please note, claims DD-214 documents are uploaded in the Profile interface.";
      const lText = userText.toLowerCase();
      if (lText.includes('vet') || lText.includes('preference') || lText.includes('military')) {
        botReply = "To register military points, go to individual Profiles and set 'Claim Veteran Preference'.";
      } else if (lText.includes('shutdown') || lText.includes('lapse') || lText.includes('appropriation')) {
        botReply = "Shutdown guidelines are listed in the 'Gov Shutdowns' log. Check lost numbers and active timelines there.";
      } else if (lText.includes('tax') || lText.includes('w4') || lText.includes('form')) {
        botReply = "Official W-4 individual withholding forms can be downloaded within the 'Tax Documents' center.";
      } else if (lText.includes('job') || lText.includes('apply') || lText.includes('clearance')) {
        botReply = "Filter requirements on the Jobs board. Direct application templates accompany each position file.";
      }
      setMessages(p => [...p, { sender: 'assistant', text: botReply }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 text-left">
      {open ? (
        <div className="bg-white rounded-xl shadow-2xl border w-80 h-[380px] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-brand-dark-blue text-white p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <i className="ri-customer-service-2-line text-lg"></i>
              <span className="font-bold text-xs font-display">USAJobs Support Line</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-300">
              <i className="ri-close-line text-lg"></i>
            </button>
          </div>

          {/* Message List */}
          <div className="flex-grow p-3 overflow-y-auto space-y-3 bg-gray-50 flex flex-col">
            {messages.map((m, i) => (
              <div 
                key={i} 
                className={`max-w-[85%] rounded-lg p-2 text-xs font-mono leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-blue-600 text-white self-end rounded-tr-none' 
                    : 'bg-white border text-gray-800 self-start rounded-tl-none shadow-sm'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="p-2 border-t flex gap-1.5 bg-white">
            <input 
              type="text" 
              value={msgInput} 
              onChange={e => setMsgInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question..." 
              className="flex-grow p-1.5 border rounded-md text-xs outline-none bg-gray-50 focus:bg-white"
            />
            <button onClick={handleSend} className="bg-brand-blue text-white py-1 px-3.5 rounded-md text-xs font-bold hover:bg-blue-600 transition-all">
              Send
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setOpen(true)}
          className="bg-brand-blue hover:bg-blue-600 text-white rounded-full p-3.5 shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        >
          <i className="ri-customer-service-2-line text-2xl"></i>
        </button>
      )}
    </div>
  );
};


// ================= MAIN APP COMPONENT =================
const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#/');
  const [bookmarkedJobs, setBookmarkedJobs] = useState<string[]>([]);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);

  useEffect(() => {
    const handleHash = () => {
      setCurrentPath(window.location.hash || '#/');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (path: string) => {
    window.location.hash = path.startsWith('/') ? path : `#/${path}`;
  };

  const handleBookmark = (jobId: string) => {
    setBookmarkedJobs(prev => {
      if (prev.includes(jobId)) {
        return prev.filter(i => i !== jobId);
      }
      return [...prev, jobId];
    });
  };

  const handleAddApplication = (newApp: Application) => {
    setApplications(prev => [newApp, ...prev]);
  };

  const handleCancelApplication = (appId: string) => {
    if (confirm('Verify: terminate this recruitment dossier register permanently? This action is irreversible.')) {
      setApplications(prev => prev.filter(a => a.id !== appId));
    }
  };

  // Router matcher
  const renderMainContent = () => {
    const path = currentPath;
    if (path === '#/' || path === '#') {
      return <HomePage onNavigate={handleNavigate} />;
    }
    if (path === '#/jobs') {
      return (
        <JobsPage 
          onNavigate={handleNavigate} 
          onBookmark={handleBookmark} 
          bookmarkedJobs={bookmarkedJobs} 
        />
      );
    }
    if (path === '#/applications') {
      return (
        <ApplicationsPage 
          applications={applications} 
          onRemoveApplication={handleCancelApplication} 
        />
      );
    }
    if (path === '#/profile') {
      return <ProfilePage />;
    }
    if (path === '#/tax-documents') {
      return <TaxDocumentsPage />;
    }
    if (path === '#/shutdowns') {
      return <ShutdownsPage />;
    }

    // Pages - Legal Sub-Routes
    if (path === '#/privacy-policy') {
      return <LegalPage section="privacy" />;
    }
    if (path === '#/terms-of-use') {
      return <LegalPage section="terms" />;
    }
    if (path === '#/foia') {
      return <LegalPage section="foia" />;
    }
    if (path === '#/no-fear-act') {
      return <LegalPage section="fear" />;
    }
    if (path === '#/equal-opportunity') {
      return <LegalPage section="equal" />;
    }

    // Dynamic Application Router: #/apply-jobId
    if (path.startsWith('#/apply-')) {
      const jobId = path.replace('#/apply-', '');
      return (
        <ApplyPage 
          jobId={jobId} 
          onNavigate={handleNavigate} 
          onSubmitApplication={handleAddApplication} 
        />
      );
    }

    // Fallback Default
    return <HomePage onNavigate={handleNavigate} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Banner onNavigate={handleNavigate} />
      <TimeZoneBar />
      <NavigationHeader 
        current_page={currentPath.replace('#', '') || '/'} 
        onNavigate={handleNavigate} 
        bookmarkedCount={bookmarkedJobs.length}
      />
      
      <main className="flex-grow">
        {renderMainContent()}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark-blue text-white border-t border-blue-900 py-12 text-xs">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-white p-1 rounded flex items-center justify-center">
                  <i className="ri-government-fill text-brand-blue text-md"></i>
                </div>
                <span className="font-bold font-display text-sm">USAJobs Gateway</span>
              </div>
              <p className="text-gray-400">
                The official national gateway providing reliable entryways to federal civil career listings.
              </p>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-wider mb-3 text-yellow-400">Recruitment Resources</h5>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => handleNavigate('jobs')} className="hover:underline">Search Positions</button></li>
                <li><button onClick={() => handleNavigate('tax-documents')} className="hover:underline font-mono">IRS Forms Center</button></li>
                <li><button onClick={() => handleNavigate('shutdowns')} className="hover:underline">Shutdown Forecasts</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-wider mb-3 text-yellow-400">Statutory Disclosures</h5>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => handleNavigate('privacy-policy')} className="hover:underline">Privacy Policy</button></li>
                <li><button onClick={() => handleNavigate('terms-of-use')} className="hover:underline">Terms of Use</button></li>
                <li><button onClick={() => handleNavigate('foia')} className="hover:underline">FOIA Freedom of Info</button></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-wider mb-3 text-yellow-400">Assistance Centers</h5>
              <ul className="space-y-2 text-gray-300">
                <li><button onClick={() => handleNavigate('no-fear-act')} className="hover:underline">No FEAR Act</button></li>
                <li><button onClick={() => handleNavigate('equal-opportunity')} className="hover:underline">Equal Opportunity</button></li>
                <li className="text-gray-400">Support Desk: 1-800-USA-GOV1</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-900 mt-10 pt-6 text-center text-gray-400">
            <p>&copy; 2026 USAJobs National Development Bureau. All rights reserved.</p>
            <p className="mt-1 text-[10px] text-gray-500">Government agency logos and trademarks are the property of their respected legal entities.</p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;
