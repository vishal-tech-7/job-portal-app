import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const RequireAuth = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // Show a loader while checking auth state
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default RequireAuth;
