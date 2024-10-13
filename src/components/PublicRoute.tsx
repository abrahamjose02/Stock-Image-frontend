// src/components/PublicRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PublicRoute: React.FC = () => {

  const { fullname } = useSelector((state: any) => state.user);


  return fullname ? <Navigate to="/home"  /> : <Outlet />;
};

export default PublicRoute;
