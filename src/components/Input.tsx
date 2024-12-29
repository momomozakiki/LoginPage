import React from "react";

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
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      )}
    </div>
  );
};

export default Input;
