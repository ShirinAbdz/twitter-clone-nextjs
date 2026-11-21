import React, { useEffect, useRef, useState } from "react";
import styles from "@/Components/styles/tweet.module.css";
import { useApp } from "../context/AppContext";

const TOKEN_RE = /([@#][\p{L}\p{N}_]+)/gu;

function formatDate(ts) {
  const diff = Date.now() - ts;
  // Only brand-new tweets (created in this browser) can be "recent",
  // so this never causes a server/client mismatch.
  if (diff >= 0 && diff < 60 * 1000) return "now";
  if (diff >= 0 && diff < 60 * 60 * 1000) return `${Math.floor(diff / 60000)}m`;
  if (diff >= 0 && diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / 3600000)}h`;
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function renderText(text) {
  return text.split(TOKEN_RE).map((part, i) => {
    if (part.startsWith("@")) {
      return (
        <a key={i} href={`https://x.com/${part.slice(1)}`} className={styles.blueLink} target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    }
    if (part.startsWith("#")) {
      return (
        <a key={i} href={`https://x.com/hashtag/${part.slice(1)}`} className={styles.blueLink} target="_blank" rel="noreferrer">
          {part}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const Tweet = ({ tweet }) => {
  const { profile, liked, retweeted, toggleLike, toggleRetweet, deleteTweet, getAuthor } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  const author = getAuthor(tweet.author);
  const isOwn = tweet.author === profile.handle;
  const isLiked = liked.includes(tweet.id);
  const isRetweeted = retweeted.includes(tweet.id);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(tweet.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <article className={styles.tweet}>
      <img src={author.avatar} alt={author.name} className={styles.profilePic} />
      <div className={styles.body}>
        <div className={styles.tweetHeader}>
          <span className={styles.username}>{author.name}</span>
          <span className={styles.handle}>@{author.handle}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.tweetDate}>{formatDate(tweet.createdAt)}</span>

          {isOwn && (
            <div className={styles.menuWrap} ref={menuRef}>
              <button
                className={styles.iconButton}
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="More options"
              >
                <img src="/more.svg" alt="" />
              </button>
              {menuOpen && (
                <div className={styles.menu}>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      deleteTweet(tweet.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <p className={styles.tweetContent}>{renderText(tweet.text)}</p>

        <div className={styles.tweetFooter}>
          <button
            className={`${styles.action} ${isRetweeted ? styles.retweeted : ""}`}
            onClick={() => toggleRetweet(tweet.id)}
            aria-pressed={isRetweeted}
            aria-label="Repost"
          >
            <img src="/retweet.svg" alt="" />
            <span>{tweet.retweets + (isRetweeted ? 1 : 0)}</span>
          </button>

          <button
            className={`${styles.action} ${isLiked ? styles.liked : ""}`}
            onClick={() => toggleLike(tweet.id)}
            aria-pressed={isLiked}
            aria-label="Like"
          >
            <img src={isLiked ? "/liked.svg" : "/like.svg"} alt="" />
            <span>{tweet.likes + (isLiked ? 1 : 0)}</span>
          </button>

          <button className={styles.action} onClick={handleShare} aria-label="Copy tweet text">
            <img src="/share.svg" alt="" />
            <span>{copied ? "Copied" : ""}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
