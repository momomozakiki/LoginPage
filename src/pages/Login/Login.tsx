import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, RememberMe } from '../../components';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/images/logo.png';
import * as styles from './Login.module.scss';

interface LoginFormData {
  username: string;
  password: string;
  rememberMe?: boolean;
}

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: yup.boolean(),
}).required();

const Login: React.FC = () => {
  const { login, isLoading, error: authError } = useAuth();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: localStorage.getItem('username') || '',
      rememberMe: localStorage.getItem('rememberMe') === 'true'
    }
  });

  const rememberMe = watch('rememberMe');

  useEffect(() => {
    if (rememberMe !== undefined) {
      localStorage.setItem('rememberMe', rememberMe.toString());
      if (!rememberMe) {
        localStorage.removeItem('username');
      }
    }
  }, [rememberMe]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.username, data.password);
      if (data.rememberMe) {
        localStorage.setItem('username', data.username);
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="center-flex-column full-height">
      <div className={styles.loginContainer}>
        <div className={styles.headerSection}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.contentSection}>
          <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
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
                {...register('password')}
                isPassword
                label="Password"
                error={errors.password?.message}
              />
            </div>
            <RememberMe
              {...register('rememberMe')}
            />
            {authError && <div className={styles.error}>{authError}</div>}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;