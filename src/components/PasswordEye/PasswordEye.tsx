import React from "react";
import Input from "../Input/Input";
import eyeClose from "../../assets/images/eye_close.png";
import eyeOpen from "../../assets/images/eye_open.png";
import * as styles from './PasswordEye.module.scss';

interface PasswordEyeProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const PasswordEye: React.FC<PasswordEyeProps> = ({ 
  placeholder = "Password",
  value,
  onChange 
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.passwordContainer}>
      <Input 
        type={showPassword ? "text" : "password"} 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
      <img
        src={showPassword ? eyeOpen : eyeClose}
        alt="toggle password visibility"
        onClick={togglePassword}
        className={styles.eyeIcon}
      />
    </div>
  );
};

export default PasswordEye; 