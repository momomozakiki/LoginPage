import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, PasswordEye } from '../../components';
import * as styles from './SignUp.module.scss';
import DocumentTitle from '../../components/DocumentTitle/DocumentTitle';

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
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      console.log(data);
      // Handle sign up logic
    } catch (error) {
      console.error('Sign up failed:', error);
    }
  };

  return (
    <>
      <DocumentTitle title="Sign Up" />
      <div className="center-flex-column full-height">
        <div className={styles.signupContainer}>
          <div className={styles.headerSection}>
            <h1 id="signup-title">Create Account</h1>
          </div>
          <div className={styles.contentSection}>
            <form 
              className={styles.signupForm} 
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-labelledby="signup-title"
            >
              <div className={styles.formGroup}>
                <Input
                  {...register('username')}
                  type="text"
                  label="Username"
                  error={errors.username?.message}
                  id="signup-username"
                  autoComplete="username"
                />
              </div>
              <div className={styles.formGroup}>
                <Input
                  {...register('email')}
                  type="email"
                  label="Email"
                  error={errors.email?.message}
                  id="signup-email"
                  autoComplete="email"
                />
              </div>
              <div className={styles.formGroup}>
                <PasswordEye
                  {...register('password')}
                  label="Password"
                  error={errors.password?.message}
                  id="signup-password"
                  autoComplete="new-password"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;