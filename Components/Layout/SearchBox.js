import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/search.module.css";
import { useApp } from "../context/AppContext";

export default function SearchBox() {
  const { query, setQuery } = useApp();
  const router = useRouter();

  const handleChange = (e) => {
    setQuery(e.target.value);
    // Search filters the home feed, so make sure the user is looking at it.
    if (router.pathname !== "/") router.push("/");
  };

  return (
    <div className={styles.searchBar}>
      <img src="/searchbar.svg" alt="" />
      <input
        type="search"
        className={styles.searchInput}
        placeholder="Search"
        aria-label="Search tweets"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
