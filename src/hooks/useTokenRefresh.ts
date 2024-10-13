import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { refreshAccessToken } from '../service/authService';

const useTokenRefresh = () => {
  const { fullname } = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!fullname) return;
    const intervalId = setInterval(() => {
      console.log("Attempting to refresh token...");
      refreshAccessToken();
    }, 10 * 60 * 1000); 

    
    return () => {
      clearInterval(intervalId);
    };
  }, [fullname]); 
};

export default useTokenRefresh;
