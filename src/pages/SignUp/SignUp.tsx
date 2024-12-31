import React from "react";
import Button from "../../components/Button/Button"; // Correct path to Button component
import Input from "../../components/Input/Input"; // Correct path to Input component
import * as styles from './SignUp.module.scss'; // Import SCSS module
import PasswordEye from "../../components/PasswordEye/PasswordEye";

const SignUp: React.FC = () => {
  return (
    <div className="center-flex-column full-height">
      <div className={styles['signup-container']}>
        <form className={styles['signup-form']}>
          <div className={styles['form-group']}>
            <Input type="text" placeholder="Username" />
          </div>
          <div className={styles['form-group']}>
            <Input type="email" placeholder="Email" />
          </div>
          <div className={styles['form-group']}>
            <PasswordEye />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;