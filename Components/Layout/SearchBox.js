import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/search.module.css";
import { useApp } from "../context/AppContext";

// Typing updates the Explore results live. On other pages, press Enter to
// open Explore with what you typed.
export default function SearchBox() {
  const { query, setQuery } = useApp();
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? { pathname: "/explore", query: { q } } : "/explore");
  };

  return (
    <form className={styles.searchBar} role="search" onSubmit={submit}>
      <img src="/searchbar.svg" alt="" />
      <input
        type="search"
        className={styles.searchInput}
        placeholder="Search"
        aria-label="Search people, hashtags and tweets"
        enterKeyHint="search"
        dir="auto"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
