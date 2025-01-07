import React from "react";
import * as styles from "./AlternativeSignUp.module.scss";

interface AlternativeOption {
  name: string;
  icon: string;
  url: string;
}

const alternativeOptions: AlternativeOption[] = [
  
  {
    name: "TikTok",
    icon: "/assets/public/alternative_signup/tiktok.png",
    url: "https://www.tiktok.com/@your-account",
  },
  {
    name: "Gmail",
    icon: "/assets/public/alternative_signup/gmail.png",
    url: "mailto:your-email@gmail.com",
  },
  {
    name: "Apple",
    icon: "/assets/public/alternative_signup/apple.png",
    url: "https://appleid.apple.com/auth/authorize",
  },
  {
    name: "Facebook",
    icon: "/assets/public/alternative_signup/facebook.png",
    url: "https://facebook.com/your-page",
  },
];

const AlternativeSignUp: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.divider}>
        <span>or continue with</span>
      </div>
      <div className={styles.options}>
        {alternativeOptions.map((option) => (
          <a
            key={option.name}
            href={option.url}
            className={styles.option}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Sign up with ${option.name}`}
          >
            <img
              src={option.icon}
              alt={option.name}
              className={styles.icon}
              width={40}
              height={40}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default AlternativeSignUp; 