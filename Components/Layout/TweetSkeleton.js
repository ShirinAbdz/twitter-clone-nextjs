import React from "react";
import styles from "../styles/skeleton.module.css";

// Grey placeholder shaped like a tweet, shown while content is loading.
export default function TweetSkeleton() {
  return (
    <div className={styles.row} aria-hidden="true">
      <div className={`${styles.shape} ${styles.circle}`} />
      <div className={styles.lines}>
        <div className={`${styles.shape} ${styles.line} ${styles.short}`} />
        <div className={`${styles.shape} ${styles.line}`} />
        <div className={`${styles.shape} ${styles.line} ${styles.medium}`} />
        <div className={`${styles.shape} ${styles.line} ${styles.footer}`} />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 4 }) {
  return (
    <div role="status" aria-label="Loading">
      {Array.from({ length: count }, (_, i) => (
        <TweetSkeleton key={i} />
      ))}
    </div>
  );
}
