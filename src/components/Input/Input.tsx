import React, { InputHTMLAttributes, useState, forwardRef } from 'react';
import * as styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ 
  error, 
  label, 
  className,
  ...props 
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    props.onChange?.(e);
  };

  const errorId = error ? `${props.id || ''}-error` : undefined;

  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputContainer}>
        {label && (
          <label 
            className={`${styles.label} ${(isFocused || hasValue) ? styles.active : ''}`}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <input 
          className={`${styles.input} ${error ? styles.error : ''} ${className || ''}`}
          aria-invalid={!!error}
          aria-describedby={errorId}
          {...props}
          ref={ref}
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
      {error && (
        <span 
          id={errorId}
          className={styles.errorMessage}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
