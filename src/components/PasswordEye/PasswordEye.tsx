import React, { useState, InputHTMLAttributes } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as styles from './PasswordEye.module.scss';

interface PasswordEyeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label?: string;
}

const PasswordEye: React.FC<PasswordEyeProps> = ({ 
  value, 
  onChange, 
  error,
  label = "Password",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        {label && (
          <label 
            className={`${styles.label} ${(isFocused || hasValue) ? styles.active : ''}`}
          >
            {label}
          </label>
        )}
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${styles.input} ${error ? styles.error : ''}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={styles.eyeButton}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default PasswordEye; 