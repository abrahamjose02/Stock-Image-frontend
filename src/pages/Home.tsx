// src/pages/Home.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../store/userSlice';
import { toast } from 'sonner';
import Navbar from '../components/Navbar';
import axiosInstance from '../axios/axiosInstance';
import useTokenRefresh from '../hooks/useTokenRefresh'; 

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { fullname, email, phonenumber } = useSelector((state: any) => state.user);
  
  useTokenRefresh();

  useEffect(() => {
    if (fullname) {
      navigate('/home', { replace: true });
    }
  }, [fullname, navigate]);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/auth/logout'); 
      if (response.status === 200) {
        dispatch(clearUser()); 
        toast.success('Logout successful!');
        navigate('/login', { replace: true });
      } else {
        toast.error('Failed to log out. Please try again.');
      }
    } catch (error:any) {
      const errorMessage = error.response?.data?.message || 'Logout failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const randomImageUrl = 'https://picsum.photos/200/200?random=' + Math.floor(Math.random() * 1000);

  return (
    <div>
      <Navbar /> 
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
        <div className="bg-gray-900 shadow-2xl rounded-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center mb-6 p-4">
            <img
              src={randomImageUrl}
              alt="User"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
            <div className="ml-4 pt-4">
              <h1 className="text-3xl font-bold text-white">Welcome, {fullname}!</h1>
              <p className="text-white">Phone: {phonenumber}</p>
              <p className="text-white">Email: {email}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
