import React, { InputHTMLAttributes, useState } from 'react';
import * as styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ 
  error, 
  label, 
  className,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContainer}>
        {label && (
          <label 
            className={`${styles.label} ${(isFocused || hasValue) ? styles.active : ''}`}
          >
            {label}
          </label>
        )}
        <input 
          className={`${styles.input} ${error ? styles.error : ''} ${className || ''}`}
          {...props}
          onChange={handleChange}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;
