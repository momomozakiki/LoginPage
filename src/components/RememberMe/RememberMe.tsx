import React from 'react';
import * as styles from './RememberMe.module.scss';

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const RememberMe: React.FC<RememberMeProps> = ({ checked, onChange }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={styles.checkbox}
        />
        <span className={styles.text}>Remember me</span>
      </label>
    </div>
  );
};

export default RememberMe; 