import React from 'react';
import { setAuthToken } from '../api/axios';

const Logout = () => {
    const handleLogout = () => {
        setAuthToken(null);
        alert('Logged out!');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
