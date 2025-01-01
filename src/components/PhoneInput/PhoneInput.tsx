import React, { useState } from 'react';
import * as styles from './PhoneInput.module.scss';

interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (value: string) => void;
  onPhoneNumberChange: (value: string) => void;
  error?: string;
}

// Common country codes with ISO country codes
const countryCodes = [
  { code: '+60', country: 'MY' },  // Malaysia
  { code: '+65', country: 'SG' },  // Singapore
  { code: '+62', country: 'ID' },  // Indonesia
  { code: '+66', country: 'TH' },  // Thailand
  { code: '+84', country: 'VN' },  // Vietnam
  { code: '+63', country: 'PH' },  // Philippines
  { code: '+95', country: 'MM' },  // Myanmar
  { code: '+856', country: 'LA' }, // Laos
  { code: '+855', country: 'KH' }, // Cambodia
  { code: '+673', country: 'BN' }, // Brunei
  { code: '+82', country: 'KR' },  // South Korea
  { code: '+81', country: 'JP' },  // Japan
  { code: '+86', country: 'CN' },  // China
  { code: '+1', country: 'US' },   // United States
  { code: '+44', country: 'GB' },  // United Kingdom
];

const PhoneInput: React.FC<PhoneInputProps> = ({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onPhoneNumberChange,
  error
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const selectedCountry = countryCodes.find(c => c.code === countryCode)?.country;

  return (
    <div className={styles.phoneInputGroup}>
      <div className={styles.countryCodeContainer}>
        {selectedCountry && (
          <span className={styles.countryLabel}>{selectedCountry}</span>
        )}
        <select
          className={styles.countryCode}
          value={countryCode}
          onChange={(e) => onCountryCodeChange(e.target.value)}
        >
          {countryCodes.map(({ code, country }) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.phoneInputContainer}>
        <label 
          className={`${styles.label} ${(isFocused || hasValue) ? styles.active : ''}`}
        >
          Phone Number
        </label>
        <input
          type="tel"
          className={`${styles.phoneInput} ${error ? styles.error : ''}`}
          value={phoneNumber}
          onChange={(e) => {
            setHasValue(!!e.target.value);
            onPhoneNumberChange(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default PhoneInput; 