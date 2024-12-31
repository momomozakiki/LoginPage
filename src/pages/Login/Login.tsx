import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import PasswordEye from "../../components/PasswordEye/PasswordEye";
import RememberMe from "../../components/RememberMe/RememberMe";
import logo from "../../assets/images/logo.png";
import * as styles from './Login.module.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Load saved credentials on component mount
  useEffect(() => {
    const savedCredentials = localStorage.getItem('credentials');
    if (savedCredentials) {
      const { username, password } = JSON.parse(savedCredentials);
      setUsername(username);
      setPassword(password);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle login logic here
    
    // Save credentials if remember me is checked
    if (rememberMe) {
      localStorage.setItem('credentials', JSON.stringify({ username, password }));
    } else {
      localStorage.removeItem('credentials');
    }
  };

  return (
    <div className="center-flex-column full-height">
      <div className={styles['login-container']}>
        <div className={styles.logoWrapper}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <Input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
            <PasswordEye 
              value={password}
              onChange={(value) => setPassword(value)}
            />
          </div>
          <RememberMe 
            checked={rememberMe} 
            onChange={setRememberMe}
          />
          <Button type="submit">Login</Button>
        </form>
        <Button type="button" onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </div>
    </div>
  );
};

export default Login;