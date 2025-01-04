import React from "react";
import * as styles from "./SkipLink.module.scss";

const SkipLink: React.FC = () => {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
  );
};

export default SkipLink;
