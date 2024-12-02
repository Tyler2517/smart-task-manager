import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Check if user is logged in (simplified for demonstration)
    const isLoggedIn = !!localStorage.getItem('token'); // Replace with your actual auth logic

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token
        navigate('/login'); // Redirect to login
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.navBrand}>
                <NavLink to="/" style={styles.link}>
                    Smart Task Manager
                </NavLink>
            </div>
            <ul style={styles.navLinks}>
                <li>
                    <NavLink
                        to="/"
                        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/tasks"
                        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                    >
                        Tasks
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/about"
                        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/register"
                        style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                    >
                        Register
                    </NavLink>
                </li>
                {isLoggedIn ? (
                    <li>
                        <button style={styles.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <NavLink
                            to="/login"
                            style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                        >
                            Login
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#282c34',
        padding: '10px 20px',
        color: 'white',
    },
    navBrand: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    navLinks: {
        listStyleType: 'none',
        display: 'flex',
        gap: '15px',
        margin: 0,
        padding: 0,
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '1rem',
    },
    activeLink: {
        textDecoration: 'none',
        color: 'yellow', // Active link color
        fontWeight: 'bold',
    },
    logoutButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '1rem',
        textDecoration: 'underline',
    },
};

export default Navbar;
