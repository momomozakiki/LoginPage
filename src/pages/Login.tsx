import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import logo from "../assets/images/logo.png";
import eyeClose from "../assets/images/eye_close.png";
import eyeOpen from "../assets/images/eye_open.png";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // React Router hook for navigation

  const togglePassword = () => {
    // Toggles the visibility of the password field
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {/* Display the company logo */}
      <img src={logo} alt="Logo" />
      <form>
        {/* Input field for the username */}
        <Input type="text" placeholder="Username" />
        {/* Password input field with visibility toggle */}
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          icon={showPassword ? eyeOpen : eyeClose}
          onIconClick={togglePassword}
        />
        {/* Button to submit the login form */}
        <Button type="submit">Login</Button>
      </form>
      {/* Button to navigate to the SignUp page */}
      <Button type="button" onClick={() => navigate("/signup")}>
        Sign Up
      </Button>
    </div>
  );
};

export default Login;
