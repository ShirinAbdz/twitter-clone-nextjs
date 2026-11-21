import React from "react";
import styles from "../styles/poll.module.css";
import { useApp } from "../context/AppContext";
import { formatTimeLeft } from "../lib/format";

// Voting buttons until you vote (or the poll ends), then the results.
export default function PollView({ tweet }) {
  const { votes, vote } = useApp();
  const poll = tweet.poll;
  const myVote = votes[tweet.id];
  const ended = Date.now() >= poll.endsAt;
  const showResults = ended || Boolean(myVote);

  const counts = poll.options.map((o) => o.votes + (myVote === o.id ? 1 : 0));
  const total = counts.reduce((sum, n) => sum + n, 0);
  const top = Math.max(...counts);

  return (
    <div className={styles.poll} role="group" aria-label="Poll">
      {poll.options.map((option, i) => {
        if (!showResults) {
          return (
            <button key={option.id} className={styles.option} dir="auto" onClick={() => vote(tweet.id, option.id)}>
              {option.text}
            </button>
          );
        }
        const pct = total === 0 ? 0 : Math.round((counts[i] / total) * 100);
        const isTop = counts[i] === top && top > 0;
        return (
          <div key={option.id} className={`${styles.result} ${isTop ? styles.top : ""}`}>
            <div className={styles.bar} style={{ width: `${pct}%` }} />
            <span className={styles.label} dir="auto">
              {option.text}
              {myVote === option.id && <span className={styles.check} aria-label="Your vote">✓</span>}
            </span>
            <span className={styles.pct}>{pct}%</span>
          </div>
        );
      })}
      <p className={styles.meta}>
        {total.toLocaleString("en-US")} {total === 1 ? "vote" : "votes"} · {formatTimeLeft(poll.endsAt)}
      </p>
    </div>
  );
}
