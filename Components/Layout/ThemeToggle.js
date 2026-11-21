import React, { useEffect } from "react";
import styles from "../styles/Sidebar.module.css";

const KEY = "twitter-clone:theme";

export default function ThemeToggle() {
  // While the user has not picked a theme, follow the system setting live.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e) => {
      try {
        if (localStorage.getItem(KEY)) return;
      } catch {}
      document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {}
  };

  const svgProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  return (
    <button className={styles.item} onClick={toggle} aria-label="Toggle light and dark theme">
      {/* Which icon/label shows is decided by CSS from the theme attribute on <html>,
          so server and browser always render the same markup. */}
      <svg {...svgProps} className={styles.moonIcon}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <svg {...svgProps} className={styles.sunIcon}>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <span className={styles.label}>
        <span className={styles.whenLight}>Dark mode</span>
        <span className={styles.whenDark}>Light mode</span>
      </span>
    </button>
  );
}
