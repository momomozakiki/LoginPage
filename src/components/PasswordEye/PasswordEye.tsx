import React, { useState, InputHTMLAttributes, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "../../components";
import * as styles from "./PasswordEye.module.scss";

interface PasswordEyeProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const PasswordEye = forwardRef<HTMLInputElement, PasswordEyeProps>(
  ({ value, onChange, error, label = "Password", id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const buttonId = `${id || "password"}-toggle`;

    return (
      <div className={styles.container}>
        <div className={styles.inputWrapper}>
          <Input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            label={label}
            error={error}
            ref={ref}
            aria-describedby={buttonId}
            {...props}
          />
          <button
            id={buttonId}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.eyeButton}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
    );
  },
);

PasswordEye.displayName = "PasswordEye";

export default PasswordEye;
