// Button.tsx
import React from "react";
import * as styles from './Button.module.scss';

interface ButtonProps {
  type?: "button" | "submit" | "reset"; // Specify allowed button types
  children: React.ReactNode; // Children elements (e.g., button text)
  onClick?: () => void; // Ensure onClick is part of the props
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
}) => {
  return (
    <button type={type} className={styles['button']} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
