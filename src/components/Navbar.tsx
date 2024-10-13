import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { clearUser } from '../store/userSlice';
import { toast } from 'sonner';
import axiosInstance from '../axios/axiosInstance';

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

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
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Logout failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  const handleHomeNavigation = () => {
    navigate('/home', { replace: true });
  };

  const handleUploadNavigation = () => {
    navigate('/upload', { replace: true });
  };

  const handleGalleryNavigation = () => {
    navigate('/gallery', { replace: true });
  };

 
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gray-900 "> 
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="self-center text-2xl font-semibold text-white whitespace-nowrap"> 
            Stock Picker
          </span>
        </a>

        
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        {/* Menu Links */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-800 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 items-center">
            <li>
              <p
                onClick={handleHomeNavigation}
                className={`block py-2 px-3 rounded md:p-0 cursor-pointer ${
                  isActive('/home') ? 'text-blue-700' : 'text-gray-300'
                } hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-blue-700`}
              >
                Home
              </p>
            </li>
            <li>
              <p
                onClick={handleUploadNavigation}
                className={`block py-2 px-3 rounded md:p-0 cursor-pointer ${
                  isActive('/upload') ? 'text-blue-700' : 'text-gray-300'
                } hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-blue-700`}
              >
                Upload Images
              </p>
            </li>
            <li>
              <p
                onClick={handleGalleryNavigation}
                className={`block py-2 px-3 rounded md:p-0 cursor-pointer ${
                  isActive('/gallery') ? 'text-blue-700' : 'text-gray-300'
                } hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-blue-700`}
              >
                Gallery
              </p>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block py-2 p-3 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
