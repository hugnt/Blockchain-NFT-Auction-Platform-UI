import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC<{ initialSeconds: number }> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval); // Dừng đồng hồ khi hết thời gian
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, []);

  // Hàm chuyển đổi giây thành định dạng mm:ss
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return <div>{formatTime(seconds)}</div>;
};

export default CountdownTimer;
