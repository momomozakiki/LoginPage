import React from "react";
import * as styles from './Input.module.scss';

interface InputProps {
  type: string;
  placeholder: string;
  icon?: string;
  onIconClick?: () => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  icon,
  onIconClick,
}) => {
  return (
    <div className="position-relative">
      {/* An input field with optional icon functionality */}
      <input type={type} placeholder={placeholder} className="form-control" />
      {icon && (
        // Display an icon for additional interactivity (e.g., show/hide password)
        <img
          src={icon}
          alt="icon"
          onClick={onIconClick}
          className={styles['icon']}
        />
      )}
    </div>
  );
};

export default Input;
