import React, { forwardRef, InputHTMLAttributes } from "react";
import * as styles from "./RememberMe.module.scss";

interface RememberMeProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RememberMe = forwardRef<HTMLInputElement, RememberMeProps>(
  ({ onChange, id = "remember-me", ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    return (
      <div
        className={styles.container}
        role="group"
        aria-labelledby={`${id}-group`}
      >
        <div className={styles.leftSection}>
          <label className={styles.label} htmlFor={id}>
            <input
              type="checkbox"
              className={styles.checkbox}
              onChange={handleChange}
              ref={ref}
              id={id}
              {...props}
            />
            <span className={styles.text}>Remember me</span>
          </label>
        </div>
        <div className={styles.rightSection}>
          <a
            href="/reset-password"
            className={styles.forgotPassword}
            aria-label="Reset your password"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    );
  },
);

RememberMe.displayName = "RememberMe";

export default RememberMe;
