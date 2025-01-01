import React, { Suspense, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as styles from './NavBar.module.scss';
import { FaUser, FaUserPlus, FaLock } from 'react-icons/fa';

type NavRoute = '/' | '/signup' | '/reset-password';

const NavBar: React.FC = () => {
  const location = useLocation();
  const [hiddenLabel, setHiddenLabel] = useState<NavRoute>('/');

  const isActive = (path: string) => location.pathname === path;

  const toggleLabel = (path: NavRoute) => {
    setHiddenLabel(hiddenLabel === path ? path : path);
  };

  return (
    <nav className={styles.navbar}>
      <Link 
        to="/" 
        className={`${styles.navItem} ${isActive('/') ? styles.active : ''}`}
        onClick={() => toggleLabel('/')}
      >
        <FaUser className={styles.icon} />
        <span className={`${styles.label} ${hiddenLabel === '/' ? styles.hidden : ''}`}>
          Login
        </span>
      </Link>
      
      <Link 
        to="/signup" 
        className={`${styles.navItem} ${isActive('/signup') ? styles.active : ''}`}
        onClick={() => toggleLabel('/signup')}
      >
        <FaUserPlus className={styles.icon} />
        <span className={`${styles.label} ${hiddenLabel === '/signup' ? styles.hidden : ''}`}>
          Sign Up
        </span>
      </Link>
      
      <Link 
        to="/reset-password" 
        className={`${styles.navItem} ${isActive('/reset-password') ? styles.active : ''}`}
        onClick={() => toggleLabel('/reset-password')}
      >
        <FaLock className={styles.icon} />
        <span className={`${styles.label} ${hiddenLabel === '/reset-password' ? styles.hidden : ''}`}>
          Reset
        </span>
      </Link>
    </nav>
  );
};

export default NavBar; 