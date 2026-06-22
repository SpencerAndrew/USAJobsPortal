import { useState, useEffect, useRef } from 'react';

const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

const useAnimatedCounter = (endValue: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startTimeRef.current === undefined) {
        startTimeRef.current = timestamp;
      }
      const elapsedTime = timestamp - startTimeRef.current;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentVal = Math.floor(easedProgress * endValue);
      
      setCount(currentVal);

      if (elapsedTime < duration) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(endValue); // Ensure it ends on the exact value
      }
    };
    
    frameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if(frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      startTimeRef.current = undefined;
    };
  }, [endValue, duration]);

  return count;
};

export default useAnimatedCounter;
