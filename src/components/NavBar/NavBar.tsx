import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as styles from "./NavBar.module.scss";
import { FaUser, FaUserPlus, FaLock } from "react-icons/fa";

type NavRoute = "/" | "/signup" | "/reset-password";

interface NavItem {
  path: NavRoute;
  label: string;
  icon: React.ReactElement;
  ariaLabel: string;
}

const navItems: NavItem[] = [
  {
    path: "/",
    label: "Login",
    icon: <FaUser />,
    ariaLabel: "Go to login page",
  },
  {
    path: "/signup",
    label: "Sign Up",
    icon: <FaUserPlus />,
    ariaLabel: "Go to sign up page",
  },
  {
    path: "/reset-password",
    label: "Reset",
    icon: <FaLock />,
    ariaLabel: "Go to password reset page",
  },
];

const NavBar: React.FC = () => {
  const location = useLocation();
  const [hiddenLabel, setHiddenLabel] = useState<NavRoute>("/");

  const isActive = (path: string) => location.pathname === path;

  const toggleLabel = (path: NavRoute) => {
    setHiddenLabel(hiddenLabel === path ? path : path);
  };

  const handleKeyDown = (e: React.KeyboardEvent, path: NavRoute) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleLabel(path);
    }
  };

  return (
    <nav
      className={styles.navbar}
      role="navigation"
      aria-label="Main navigation"
    >
      {navItems.map(({ path, label, icon, ariaLabel }) => (
        <Link
          key={path}
          to={path}
          className={`${styles.navItem} ${isActive(path) ? styles.active : ""}`}
          onClick={() => toggleLabel(path)}
          onKeyDown={(e) => handleKeyDown(e, path)}
          aria-current={isActive(path) ? "page" : undefined}
          aria-label={ariaLabel}
          role="menuitem"
          tabIndex={0}
        >
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
          <span
            className={`${styles.label} ${hiddenLabel === path ? styles.hidden : ""}`}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
