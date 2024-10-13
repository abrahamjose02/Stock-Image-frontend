
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    
    dispatch(clearUser());
    
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
