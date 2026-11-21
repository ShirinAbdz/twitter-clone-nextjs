import React from "react";
import Sidebar from "./Sidebar";
import Suggestions from "./Suggestions";
import styles from "@/Components/styles/layout.module.css";
import { useApp } from "../context/AppContext";

const Layout = ({ children }) => {
  const { saveFailed } = useApp();

  return (
    <div className={styles.container}>
      {saveFailed && (
        <div className={styles.banner} role="alert">
          Your browser’s storage is full, so recent changes may not be saved. Delete some tweets with photos.
        </div>
      )}
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
