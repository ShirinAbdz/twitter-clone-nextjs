import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Sidebar.module.css";
import ThemeToggle from "./ThemeToggle";
import { useApp } from "../context/AppContext";

// href = a real page. Items without one are still "coming soon".
const NAV = [
  { href: "/", icon: "/home.svg", label: "Home", active: (p) => p === "/" },
  { href: "/explore", icon: "/explore.svg", label: "Explore", active: (p) => p === "/explore" },
  { href: "/notifications", icon: "/notification.svg", label: "Notifications", active: (p) => p === "/notifications", badge: true },
  { icon: "/message.svg", label: "Messages" },
  { icon: "/list.svg", label: "Lists" },
  { href: "/bookmarks", icon: "/bookmark.svg", label: "Bookmarks", active: (p) => p === "/bookmarks" },
  { icon: "/community.svg", label: "Communities" },
  { href: "/profile", icon: "/profile.svg", label: "Profile", active: (p) => p === "/profile" },
];

const Sidebar = () => {
  const router = useRouter();
  const { unreadCount, hydrated } = useApp();
  const isHome = router.pathname === "/";

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

      {NAV.map((entry) => {
        if (!entry.href) {
          return (
            <button key={entry.label} className={`${styles.item} ${styles.soon}`} disabled title="Coming soon">
              <img className="invert-dark" src={entry.icon} alt="" />
              <span className={styles.label}>{entry.label}</span>
            </button>
          );
        }

        const active = entry.active(router.pathname);
        const unread = entry.badge && hydrated ? unreadCount : 0;
        return (
          <Link
            key={entry.label}
            href={entry.href}
            className={`${styles.item} ${active ? styles.active : ""}`}
            aria-current={active ? "page" : undefined}
            aria-label={unread ? `${entry.label}, ${unread} unread` : undefined}
          >
            <span className={styles.iconWrap}>
              <img className="invert-dark" src={entry.icon} alt="" />
              {unread > 0 && <span className={styles.badge}>{unread > 9 ? "9+" : unread}</span>}
            </span>
            <span className={styles.label}>{entry.label}</span>
          </Link>
        );
      })}

      <ThemeToggle />

      <button className={`${styles.item} ${styles.post}`} onClick={handlePost} aria-label="Post">
        <img src="/post.svg" alt="" />
        <span className={styles.postLabel}>Post</span>
      </button>
    </nav>
  );
};

export default Sidebar;
