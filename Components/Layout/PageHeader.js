import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/homeHeader.module.css";
import SearchBox from "./SearchBox";

// Sticky title bar used on every page.
//   back       -> shows a back arrow
//   withSearch -> shows the search box on small screens (the right column has it on desktop)
//   action     -> optional element on the right (e.g. a "Clear" button)
export default function PageHeader({ title, subtitle, back = false, withSearch = false, action = null }) {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.row}>
        {back && (
          <button className={styles.back} onClick={goBack} aria-label="Go back">
            <img className="invert-dark" src="/arrow back.svg" alt="" />
          </button>
        )}
        <div className={styles.titles}>
          <h1>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {withSearch && (
        <div className={styles.search}>
          <SearchBox />
        </div>
      )}
    </header>
  );
}
