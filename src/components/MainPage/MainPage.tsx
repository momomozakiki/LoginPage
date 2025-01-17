import React from "react";
import { NavBar } from "../../components";
import * as styles from "./MainPage.module.scss";

interface MainPageProps {
  children: React.ReactNode;
}

const MainPage: React.FC<MainPageProps> = ({ children }) => {
  return (
    <div className={styles.mainPage}>
      <main className={styles.mainContent}>{children}</main>
      <div className={styles.navBar}>
        <NavBar />
      </div>
    </div>
  );
};

export default MainPage;
