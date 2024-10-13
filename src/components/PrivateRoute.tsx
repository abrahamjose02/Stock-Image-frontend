import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute:React.FC = () => {
    const {fullname} = useSelector((state:any)=>state.user);
    return fullname ? <Outlet/> : <Navigate to="/login"/>;
}

export default PrivateRoute
