import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './authentication';
import CrecheSettings from './CrecheSettings';
import Unauthorized from './Unauthorized';
import Home from './Home';

// Mock user roles for demonstration purposes
const mockUser = {
    role: 'normalUser', // Change to 'crecheOwner' to test different roles
};

// Role-based route protection component
const ProtectedRoute = ({ allowedRoles }) => {
    const userRole = mockUser.role;

    if (allowedRoles.includes(userRole)) {
        return <Outlet />;
    } else {
        return <Navigate to="/unauthorized" />;
    }
};

export default ProtectedRoute;

// Example usage in your routes (e.g., App.jsx or Routes.jsx)
/*

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route
                    path="/creche-settings"
                    element={
                        <ProtectedRoute allowedRoles={['crecheOwner']}>
                            <CrecheSettings />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
*/