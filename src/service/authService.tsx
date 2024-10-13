import axiosInstance from '../axios/axiosInstance'; 
import { toast } from 'sonner';

export const refreshAccessToken = async () => {
  try {
    const response = await axiosInstance.post('/auth/refresh-token');
    if (response.status === 200) {
      toast.success('Access token refreshed successfully!');
    }
  } catch (error:any) {
    const errorMessage = error.response?.data?.message || 'Failed to refresh access token.';
    toast.error(errorMessage);
    console.log('Error refreshing access token:', errorMessage);
  }
};
