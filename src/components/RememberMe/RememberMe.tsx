import React, { forwardRef, InputHTMLAttributes } from 'react';
import * as styles from './RememberMe.module.scss';

interface RememberMeProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RememberMe = forwardRef<HTMLInputElement, RememberMeProps>(({ 
  onChange,
  ...props 
}, ref) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <label className={styles.label}>
          <input
            type="checkbox"
            className={styles.checkbox}
            onChange={handleChange}
            ref={ref}
            {...props}
          />
          <span className={styles.text}>Remember me</span>
        </label>
      </div>
      <div className={styles.rightSection}>
        <a href="/reset-password" className={styles.forgotPassword}>
          Forgot Password?
        </a>
      </div>
    </div>
  );
});

RememberMe.displayName = 'RememberMe';

export default RememberMe; 