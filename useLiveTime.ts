
import { useState, useEffect } from 'react';

const timeZones = [
  { label: 'ET', timeZone: 'America/New_York' },
  { label: 'CT', timeZone: 'America/Chicago' },
  { label: 'MT', timeZone: 'America/Denver' },
  { label: 'PT', timeZone: 'America/Los_Angeles' },
  { label: 'AKT', timeZone: 'America/Anchorage' },
  { label: 'HST', timeZone: 'Pacific/Honolulu' },
];

const useLiveTime = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const formattedTimes = timeZones.map(({ label, timeZone }) => ({
    label,
    time: time.toLocaleTimeString('en-US', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(' ', ''),
  }));

  return formattedTimes;
};

export default useLiveTime;
