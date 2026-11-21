import React from "react";
import Sidebar from "./Sidebar";
import Suggestions from "./Suggestions";
import styles from "@/Components/styles/layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <aside className={`${styles.column} ${styles.left}`}>
        <Sidebar />
      </aside>
      <main className={styles.main}>{children}</main>
      <aside className={`${styles.column} ${styles.right}`}>
        <Suggestions />
      </aside>
    </div>
  );
};

export default Layout;
