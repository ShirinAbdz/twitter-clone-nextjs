import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Sidebar.module.css";
import ThemeToggle from "./ThemeToggle";

const SOON = [
  ["/explore.svg", "Explore"],
  ["/notification.svg", "Notification"],
  ["/message.svg", "Messages"],
  ["/list.svg", "Lists"],
  ["/bookmark.svg", "Bookmarks"],
  ["/community.svg", "Communities"],
];

const Sidebar = () => {
  const router = useRouter();
  const isHome = router.pathname === "/";
  const isProfile = router.pathname === "/profile";

  const handlePost = () => {
    const focusInput = () => document.getElementById("compose-input")?.focus();
    if (isHome) {
      focusInput();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/").then(() => setTimeout(focusInput, 50));
    }
  };

  return (
    <nav className={styles.nav} aria-label="Main">
      <Link href="/" className={`${styles.item} ${styles.logo}`} aria-label="Home">
        <img className="invert-dark" src="/logo.svg" alt="X logo" />
      </Link>

      <Link href="/" className={`${styles.item} ${isHome ? styles.active : ""}`}>
        <img className="invert-dark" src="/home.svg" alt="" />
        <span className={styles.label}>Home</span>
      </Link>

      {SOON.map(([icon, label]) => (
        <button key={label} className={`${styles.item} ${styles.soon}`} disabled title="Coming soon">
          <img className="invert-dark" src={icon} alt="" />
          <span className={styles.label}>{label}</span>
        </button>
      ))}

      <Link href="/profile" className={`${styles.item} ${isProfile ? styles.active : ""}`}>
        <img className="invert-dark" src="/profile.svg" alt="" />
        <span className={styles.label}>Profile</span>
      </Link>

      <ThemeToggle />

      <button className={`${styles.item} ${styles.post}`} onClick={handlePost} aria-label="Post">
        <img src="/post.svg" alt="" />
        <span className={styles.postLabel}>Post</span>
      </button>
    </nav>
  );
};

export default Sidebar;
