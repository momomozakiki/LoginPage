import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, PhoneInput, PasswordEye } from '../../components';
import logo from '../../assets/images/logo.png';
import * as styles from './ResetPassword.module.scss';

interface ResetPasswordForm {
  email: string;
  countryCode: string;
  phoneNumber: string;
  otp: string;
  newPassword: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  countryCode: yup.string().required('Country code is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  otp: yup.string().required('OTP is required'),
  newPassword: yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
}).required();

const ResetPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>({
    resolver: yupResolver(schema)
  });

  const [countryCode, setCountryCode] = useState('+60');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onSubmit = (data: ResetPasswordForm) => {
    console.log(data);
    // Handle reset password logic
  };

  return (
    <div className="center-flex-column full-height">
      <div className={styles.resetContainer}>
        <div className={styles.headerSection}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.contentSection}>
          <form className={styles.resetForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <Input
                {...register('email')}
                type="email"
                label="Email"
                error={errors.email?.message}
              />
            </div>
            <div className={styles.formGroup}>
              <PhoneInput
                countryCode={countryCode}
                phoneNumber={phoneNumber}
                onCountryCodeChange={setCountryCode}
                onPhoneNumberChange={setPhoneNumber}
                error={errors.phoneNumber?.message}
              />
            </div>
            <div className={styles.formGroup}>
              <Input
                {...register('otp')}
                type="text"
                label="OTP"
                error={errors.otp?.message}
              />
            </div>
            <div className={styles.formGroup}>
              <PasswordEye
                {...register('newPassword')}
                label="New Password"
                error={errors.newPassword?.message}
              />
            </div>
            <Button type="submit">Reset Password</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 