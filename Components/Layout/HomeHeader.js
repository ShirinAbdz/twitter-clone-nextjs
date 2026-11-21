import React from "react";
import styles from "../styles/homeHeader.module.css";
import SearchBox from "./SearchBox";

export default function HomeHeader() {
  return (
    <header className={styles.header}>
      <h1>Home</h1>
      {/* The right-hand column (with its own search) is hidden on small screens. */}
      <div className={styles.search}>
        <SearchBox />
      </div>
    </header>
  );
}
