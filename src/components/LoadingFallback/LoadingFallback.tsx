import React from 'react';
import * as styles from './LoadingFallback.module.scss';

interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div 
      className={styles.loadingContainer}
      role="status"
      aria-live="polite"
    >
      <div className={styles.spinner} aria-hidden="true" />
      <span className={styles.message}>{message}</span>
    </div>
  );
};

export default LoadingFallback; 