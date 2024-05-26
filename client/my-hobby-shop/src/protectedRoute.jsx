import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from './context/AuthContext.jsx';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/authorization" replace />;
    }

    return element;
};

export default ProtectedRoute;