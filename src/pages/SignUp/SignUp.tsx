import React from "react";
import Button from "../../components/Button/Button"; // Correct path to Button component
import Input from "../../components/Input/Input"; // Correct path to Input component
import * as styles from './SignUp.module.scss'; // Import SCSS module

const SignUp: React.FC = () => {
  return (
    <div className={styles['signup-container']}>
      <form className={styles['signup-form']}>
        {/* Input field for the username */}
        <div className={styles['form-group']}>
          <Input type="text" placeholder="Username" />
        </div>
        {/* Input field for the email */}
        <div className={styles['form-group']}>
          <Input type="email" placeholder="Email" />
        </div>
        {/* Input field for the password */}
        <div className={styles['form-group']}>
          <Input type="password" placeholder="Password" />
        </div>
        {/* Button to submit the signup form */}
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;