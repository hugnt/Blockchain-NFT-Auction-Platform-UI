import React, { useState, useEffect, useContext } from 'react';
import SmartContractContext from '~/contexts/components/SmartContractContext';
import { SmartContractType } from '~/types/SmartContractType';

const CountdownTimer: React.FC<{ startTimeVote: number; endTimeVote: number }> = ({ startTimeVote, endTimeVote }) => {
  const [seconds, setSeconds] = useState<number>(Math.floor((endTimeVote - Date.now()) / 1000));
  const {setVotingOnGoing} = useContext<SmartContractType>(SmartContractContext); 
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = Math.floor((endTimeVote - currentTime) / 1000);
  
      if (remainingTime <= 0) {
        clearInterval(interval); // Dừng đồng hồ khi hết thời gian
        setVotingOnGoing(false);
        setSeconds(0);
      } else if (Math.abs(currentTime - startTimeVote) <= 1000) { // So sánh khoảng cách giữa currentTime và startTimeVote với ngưỡng 1 giây
        setVotingOnGoing(true);
      } else {
        setSeconds(remainingTime);
      }
    }, 1000);
  
    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, [endTimeVote, startTimeVote]);
  

  // Hàm chuyển đổi giây thành định dạng ngày-giờ:phút:giây
  const formatTime = (seconds: number): string => {
    // Tính số ngày
    const days = Math.floor(seconds / 86400);
    // Tính số giây còn lại sau khi đã tính số ngày
    const remainingSecondsAfterDays = seconds % 86400;
    // Tính số giờ
    const hours = Math.floor(remainingSecondsAfterDays / 3600);
    // Tính số giây còn lại sau khi đã tính số giờ
    const remainingSecondsAfterHours = remainingSecondsAfterDays % 3600;
    // Tính số phút
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    // Tính số giây còn lại
    const remainingSeconds = remainingSecondsAfterHours % 60;
    
    // Trả về chuỗi kết quả
    return `${days} ngày, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  

  return <div>{formatTime(seconds)}</div>;
};

export default CountdownTimer;
