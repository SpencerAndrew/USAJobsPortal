
import { useEffect, useState } from 'react';

const useCountUp = (targetDate: string) => {
  const countUpDate = new Date(targetDate).getTime();

  const [countUp, setCountUp] = useState(
    new Date().getTime() - countUpDate
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountUp(new Date().getTime() - countUpDate);
    }, 1000);

    return () => clearInterval(interval);
  }, [countUpDate]);

  return getReturnValues(countUp);
};

const getReturnValues = (countUp: number) => {
  if (countUp < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(countUp / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countUp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countUp % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countUp % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

export { useCountUp };
