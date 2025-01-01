// Button.tsx
import React from "react";
import * as styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    isLoading && styles.loading,
    className
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinner} />
      ) : children}
    </button>
  );
};

export default Button;