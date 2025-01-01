// Button.tsx
import React from "react";
import * as styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  fullWidth = true,
  children,
  className,
  disabled,
  type = 'button',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    isLoading && styles.loading,
    !fullWidth && styles.autoWidth,
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses}
      disabled={disabled || isLoading}
      type={type}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span 
          className={styles.spinner} 
          role="status"
          aria-label="Loading"
        />
      ) : children}
    </button>
  );
};

Button.displayName = 'Button';

export default Button;