import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, PasswordEye } from '../../components';
import * as styles from './SignUp.module.scss';

interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

const schema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
}).required();

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: SignUpForm) => {
    console.log(data);
    // Handle sign up logic
  };

  return (
    <div className="center-flex-column full-height">
      <div className={styles.signupContainer}>
        <div className={styles.headerSection}>
          <h1>Register</h1>
        </div>
        <div className={styles.contentSection}>
          <form className={styles.signupForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <Input
                {...register('username')}
                type="text"
                label="Username"
                error={errors.username?.message}
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                {...register('email')}
                type="email"
                label="Email"
                error={errors.email?.message}
              />
            </div>
            <div className={styles.formGroup}>
              <PasswordEye
                {...register('password')}
                label="Password"
                error={errors.password?.message}
              />
            </div>
            <Button type="submit">Sign Up</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;