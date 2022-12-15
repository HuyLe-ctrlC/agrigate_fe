import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    const userToken = localStorage.getItem('userInfo');
    if (userToken) {
        const user = { token: true };
        return user && user.token;
    } else {
        const user = { token: false };
        return user && user.token;
    }
};

const PrivateProtectedRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateProtectedRoute;
