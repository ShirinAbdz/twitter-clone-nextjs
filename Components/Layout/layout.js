import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Suggestions from "./Suggestions";
import styles from "../styles/Layout.module.css";

const Layout = () => {
  const [currentContent, setCurrentContent] = useState("profile");

  const handleSidebarClick = (option) => {
    setCurrentContent(option);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.column}>
          <Sidebar onSidebarClick={handleSidebarClick} />
        </div>
        <div id={styles.column2} className={styles.column}>
          <Content currentContent={currentContent} />
        </div>
        <div className={styles.column}>
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Layout;
