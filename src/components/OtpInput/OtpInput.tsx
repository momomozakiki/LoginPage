import React, { InputHTMLAttributes, forwardRef, useState, useEffect } from 'react';
import { Button } from '../../components';
import * as styles from './OtpInput.module.scss';

interface OtpInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  error?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendOtp?: () => void;
  otpSent?: boolean;
  isLoading?: boolean;
  countdownDuration?: number;
}

const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(({
  error,
  label = "OTP",
  onChange,
  onSendOtp,
  otpSent,
  isLoading,
  id,
  countdownDuration = 60,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    onChange?.(e);
  };

  const handleSendOtp = () => {
    onSendOtp?.();
    setCountdown(countdownDuration);
  };

  const isButtonDisabled = isLoading || countdown > 0;
  const buttonText = countdown > 0 
    ? `${countdown}s` 
    : otpSent ? 'Resend OTP' : 'Send OTP';

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={`${styles.input} ${error ? styles.error : ''}`}
            onChange={handleChange}
            ref={ref}
            id={id}
            inputMode="numeric"
            pattern="[0-9]*"
            aria-describedby={otpSent ? `${id}-sent` : undefined}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {label && (
            <label 
              className={`${styles.label} ${(isFocused || hasValue || otpSent) ? styles.active : ''}`}
              htmlFor={id}
            >
              {otpSent ? 'OTP sent to your phone/email' : label}
            </label>
          )}
        </div>
        <Button
          type="button"
          onClick={handleSendOtp}
          disabled={isButtonDisabled}
          variant="primary"
          size="small"
          fullWidth={false}
          className={styles.sendOtpButton}
        >
          {buttonText}
        </Button>
      </div>
      {error && (
        <span className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

OtpInput.displayName = 'OtpInput';

export default OtpInput; 