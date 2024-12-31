import React from "react";
import * as styles from './Input.module.scss';

interface InputProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className={styles['input-wrapper']}>
      <input 
        type={type} 
        placeholder={placeholder} 
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
