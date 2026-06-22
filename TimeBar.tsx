import React from 'react';
import useLiveTime from '../hooks/useLiveTime';

const TimeBar: React.FC = () => {
  const times = useLiveTime();

  return (
    <div className="bg-blue-800 text-white text-sm py-2 px-4 md:px-8">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center w-full">
          {times.map(({ label, time }) => (
            <div key={label} className="flex items-center">
              <span className="font-semibold">{label}:</span>
              <span className="ml-1.5 font-mono">{time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeBar;
