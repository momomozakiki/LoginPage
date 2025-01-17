import React from "react";
import * as styles from "./AlternativeSignUp.module.scss";
import tiktokIcon from "./assets/images/tiktok.png"; // Import images directly
import gmailIcon from "./assets/images/gmail.png";
import appleIcon from "./assets/images/apple.png";
import facebookIcon from "./assets/images/facebook.png";

interface AlternativeOption {
  name: string;
  icon: string; // Use the imported image directly
  url: string;
}

const alternativeOptions: AlternativeOption[] = [
  {
    name: "TikTok",
    icon: tiktokIcon, // Use the imported image
    url: "https://www.tiktok.com/@your-account",
  },
  {
    name: "Gmail",
    icon: gmailIcon, // Use the imported image
    url: "mailto:your-email@gmail.com",
  },
  {
    name: "Apple",
    icon: appleIcon, // Use the imported image
    url: "https://appleid.apple.com/auth/authorize",
  },
  {
    name: "Facebook",
    icon: facebookIcon, // Use the imported image
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
              src={option.icon} // Use the imported image
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