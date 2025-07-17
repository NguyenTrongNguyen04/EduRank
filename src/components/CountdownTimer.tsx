import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  end: string; // ISO date string
  animatePulse?: boolean;
}

const getTimeLeft = (end: string) => {
  const endTime = new Date(end).getTime();
  const now = Date.now();
  const diff = endTime - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ end, animatePulse }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(end));
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(end));
      if (animatePulse) {
        setPulse(true);
        setTimeout(() => setPulse(false), 200);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [end, animatePulse]);

  if (!timeLeft) {
    return <span className="text-red-500 font-bold">Đã kết thúc</span>;
  }

  return (
    <div className={`flex space-x-2 text-lg font-semibold text-blue-700 transition-transform ${animatePulse && pulse ? 'scale-110' : ''}`}>
      <span>{timeLeft.days} ngày</span>
      <span>{timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}</span>
    </div>
  );
};

export default CountdownTimer; 