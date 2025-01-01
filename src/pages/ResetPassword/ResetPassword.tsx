import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Input, PhoneInput, PasswordEye, OtpInput } from '../../components';
import * as styles from './ResetPassword.module.scss';
import DocumentTitle from '../../components/DocumentTitle/DocumentTitle';

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
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, trigger } = useForm<ResetPasswordForm>({
    resolver: yupResolver(schema)
  });

  const [countryCode, setCountryCode] = useState('+60');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    setValue('phoneNumber', value);
    trigger('phoneNumber'); // This will trigger validation
  };

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      console.log(data);
      // Handle reset password logic
    } catch (error) {
      console.error('Reset password failed:', error);
    }
  };

  const handleSendOTP = async () => {
    try {
      setOtpSent(true);
      // Handle OTP sending logic
    } catch (error) {
      console.error('OTP sending failed:', error);
    }
  };

  return (
    <>
      <DocumentTitle title="Reset Password" />
      <div className="center-flex-column full-height">
        <div className={styles.resetContainer}>
          <div className={styles.headerSection}>
            <h1 id="reset-title">Reset Password</h1>
          </div>
          <div className={styles.contentSection}>
            <form 
              className={styles.resetForm} 
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-labelledby="reset-title"
            >
              <div className={styles.formGroup}>
                <Input
                  {...register('email')}
                  type="email"
                  label="Email"
                  error={errors.email?.message}
                  id="reset-email"
                  autoComplete="email"
                />
              </div>
              <div className={styles.formGroup}>
                <PhoneInput
                  countryCode={countryCode}
                  phoneNumber={phoneNumber}
                  onCountryCodeChange={setCountryCode}
                  onPhoneNumberChange={handlePhoneNumberChange}
                  error={errors.phoneNumber?.message}
                  id="reset-phone"
                />
              </div>
              <div className={styles.formGroup}>
                <OtpInput
                  {...register('otp')}
                  label="OTP"
                  error={errors.otp?.message}
                  id="reset-otp"
                  onSendOtp={handleSendOTP}
                  otpSent={otpSent}
                  isLoading={isSubmitting}
                />
              </div>
              <div className={styles.formGroup}>
                <PasswordEye
                  {...register('newPassword')}
                  label="New Password"
                  error={errors.newPassword?.message}
                  id="reset-password"
                  autoComplete="new-password"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                isLoading={isSubmitting}
              >
                {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword; 