import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button"; // Correct path to Button component
import Input from "../../components/Input/Input"; // Correct path to Input component
import logo from "../../assets/images/logo.png";
import eyeClose from "../../assets/images/eye_close.png";
import eyeOpen from "../../assets/images/eye_open.png";
import * as styles from './Login.module.scss'; // Import SCSS module

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // React Router hook for navigation

  const togglePassword = () => {
    // Toggles the visibility of the password field
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles['login-container']}>
      {/* Display the company logo */}
      <img src={logo} alt="Logo" className={styles.logo} />
      <form className={styles['login-form']}>
        {/* Input field for the username */}
        <div className={styles['form-group']}>
          <Input type="text" placeholder="Username" />
        </div>
        {/* Password input field with visibility toggle */}
        <div className={styles['form-group']}>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            icon={showPassword ? eyeOpen : eyeClose}
            onIconClick={togglePassword}
          />
        </div>
        {/* Button to submit the login form */}
        <Button type="submit">Login</Button>
      </form>
      {/* Button to navigate to the SignUp page */}
      <Button type="button" onClick={() => navigate("/signup")} className={styles['signup-button']}>
        Sign Up
      </Button>
    </div>
  );
};

export default Login;