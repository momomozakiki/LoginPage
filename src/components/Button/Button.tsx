import React from "react";
import classNames from "classnames";
import * as styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  isLoading = false,
  fullWidth = true,
  children,
  className,
  disabled,
  type = "button",
  ...props
}) => {
  const buttonClasses = classNames(
    styles.button, // Base button styles
    styles[variant], // 'primary' or 'secondary'
    styles[size], // 'small', 'medium', or 'large'
    { [styles.loading]: isLoading }, // Adds loading class when isLoading is true
    { [styles.autoWidth]: !fullWidth }, // Adjusts width style if fullWidth is false
    className, // Allows custom class overrides
  );

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      type={type}
      aria-busy={isLoading}
      aria-disabled={disabled || isLoading}
      aria-label={isLoading ? "Loading" : undefined}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinner} role="status" aria-label="Loading" />
      ) : (
        children
      )}
    </button>
  );
};

Button.displayName = "Button";

export default Button;
