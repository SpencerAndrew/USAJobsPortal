import React from 'react';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-4xl font-bold">{value}</p>
    <p className="text-gray-300 mt-2">{label}</p>
  </div>
);

const BenefitCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-white bg-opacity-5 p-6 rounded-lg">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-2 text-gray-300">{description}</p>
  </div>
);

const Stats: React.FC = () => {
  return (
    <section className="bg-brand-dark-blue text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold">Federal Employment by the Numbers</h2>
          <p className="mt-4 text-lg text-gray-300">
            The federal government is one of the largest employers in the United States, offering diverse career opportunities.
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value="15,000+" label="Active Job Postings" />
          <StatCard value="2.1M" label="Federal Employees" />
          <StatCard value="100+" label="Government Agencies" />
          <StatCard value="500+" label="Job Categories" />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <BenefitCard 
                title="Competitive Benefits"
                description="Federal employees enjoy comprehensive health insurance, retirement plans, paid time off, and job security."
            />
            <BenefitCard 
                title="Nationwide Opportunities"
                description="Positions available in all 50 states, Washington DC, and international locations around the world."
            />
            <BenefitCard 
                title="Serve Your Country"
                description="Make a meaningful impact by serving the American people and contributing to the nation's mission."
            />
        </div>
      </div>
    </section>
  );
};

export default Stats;
