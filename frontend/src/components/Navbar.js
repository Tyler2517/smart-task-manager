import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
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
};

export default Navbar;
