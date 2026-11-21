import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/Components/styles/tweet.module.css";
import { useApp } from "../context/AppContext";
import PollView from "./PollView";
import { formatDate, formatFullDate } from "../lib/format";
import { hashtagHref, profileHref, replyHref, tweetHref } from "../lib/links";

// Odd entries of the split are the @mentions and #hashtags.
const TOKEN_RE = /([@#][\p{L}\p{N}_\u200c]+)/gu;

function renderText(text, handleMap, ownHandle) {
  return text.split(TOKEN_RE).map((part, i) => {
    if (i % 2 === 0) return <React.Fragment key={i}>{part}</React.Fragment>;

    if (part[0] === "#") {
      return (
        <Link key={i} href={hashtagHref(part.slice(1))} className={styles.blueLink}>
          {part}
        </Link>
      );
    }

    const known = handleMap.get(part.slice(1).toLowerCase());
    if (known) {
      return (
        <Link key={i} href={profileHref(known, ownHandle)} className={styles.blueLink}>
          {part}
        </Link>
      );
    }
    return (
      <a key={i} href={`https://x.com/${part.slice(1)}`} className={styles.blueLink} target="_blank" rel="noreferrer">
        {part}
      </a>
    );
  });
}

// detail = the big version shown at the top of a tweet's own page.
const Tweet = ({ tweet, detail = false }) => {
  const router = useRouter();
  const {
    profile,
    liked,
    retweeted,
    bookmarks,
    replyCounts,
    tweetById,
    handleMap,
    toggleLike,
    toggleRetweet,
    toggleBookmark,
    deleteTweet,
    getAuthor,
  } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef(null);

  const author = getAuthor(tweet.author);
  const authorLink = profileHref(author.handle, profile.handle);
  const isOwn = tweet.author === profile.handle;
  const isLiked = liked.includes(tweet.id);
  const isRetweeted = retweeted.includes(tweet.id);
  const isBookmarked = bookmarks.includes(tweet.id);
  const replyCount = replyCounts[tweet.id] || 0;
  const likeCount = tweet.likes + (isLiked ? 1 : 0);
  const retweetCount = tweet.retweets + (isRetweeted ? 1 : 0);
  const parent = tweet.replyTo ? tweetById.get(tweet.replyTo) : null;

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

  const handleDelete = () => {
    setMenuOpen(false);
    deleteTweet(tweet.id);
    // The page this tweet lived on is gone, so leave it.
    if (detail) router.replace(tweet.replyTo ? tweetHref(tweet.replyTo) : "/");
  };

  // Clicking anywhere on a tweet opens it, except on links, buttons and selected text.
  const openTweet = (e) => {
    if (detail) return;
    if (e.target.closest("a, button, input, textarea")) return;
    if (window.getSelection && window.getSelection().toString()) return;
    router.push(tweetHref(tweet.id));
  };

  const menu = isOwn && (
    <div className={styles.menuWrap} ref={menuRef}>
      <button className={styles.iconButton} onClick={() => setMenuOpen((o) => !o)} aria-label="More options">
        <img src="/more.svg" alt="" />
      </button>
      {menuOpen && (
        <div className={styles.menu}>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );

  const content = (
    <>
      {parent && !detail && (
        <p className={styles.replyingTo}>
          Replying to{" "}
          <Link href={profileHref(parent.author, profile.handle)} className={styles.blueLink}>
            @{parent.author}
          </Link>
        </p>
      )}
      {tweet.text && (
        <p className={detail ? styles.detailContent : styles.tweetContent} dir="auto">
          {renderText(tweet.text, handleMap, profile.handle)}
        </p>
      )}
      {tweet.image && <img src={tweet.image} alt="Attached to the post" className={styles.media} loading="lazy" />}
      {tweet.poll && <PollView tweet={tweet} />}
    </>
  );

  const footer = (
    <div className={styles.tweetFooter}>
      <Link href={replyHref(tweet.id)} className={styles.action} aria-label={`Reply, ${replyCount} replies`}>
        <img src="/comment.svg" alt="" />
        <span>{replyCount}</span>
      </Link>

      <button
        className={`${styles.action} ${isRetweeted ? styles.retweeted : ""}`}
        onClick={() => toggleRetweet(tweet.id)}
        aria-pressed={isRetweeted}
        aria-label="Repost"
      >
        <img src="/retweet.svg" alt="" />
        <span>{retweetCount}</span>
      </button>

      <button
        className={`${styles.action} ${isLiked ? styles.liked : ""}`}
        onClick={() => toggleLike(tweet.id)}
        aria-pressed={isLiked}
        aria-label="Like"
      >
        <img src={isLiked ? "/liked.svg" : "/like.svg"} alt="" />
        <span>{likeCount}</span>
      </button>

      <button
        className={`${styles.action} ${isBookmarked ? styles.bookmarked : ""}`}
        onClick={() => toggleBookmark(tweet.id)}
        aria-pressed={isBookmarked}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
      >
        <img src={isBookmarked ? "/bookmark-filled.svg" : "/bookmar.svg"} alt="" />
      </button>

      <button className={styles.action} onClick={handleShare} aria-label="Copy tweet text">
        <img src="/share.svg" alt="" />
        <span>{copied ? "Copied" : ""}</span>
      </button>
    </div>
  );

  if (detail) {
    return (
      <article className={`${styles.tweet} ${styles.detail}`}>
        <div className={styles.detailHeader}>
          <Link href={authorLink} aria-label={`${author.name}'s profile`}>
            <img src={author.avatar} alt="" className={styles.profilePic} />
          </Link>
          <Link href={authorLink} className={styles.detailNames}>
            <span className={styles.username}>{author.name}</span>
            <span className={styles.handle}>@{author.handle}</span>
          </Link>
          {menu}
        </div>

        {content}

        <p className={styles.timeRow}>{formatFullDate(tweet.createdAt)}</p>
        <div className={styles.stats}>
          <span>
            <b>{replyCount}</b> {replyCount === 1 ? "Reply" : "Replies"}
          </span>
          <span>
            <b>{retweetCount}</b> {retweetCount === 1 ? "Repost" : "Reposts"}
          </span>
          <span>
            <b>{likeCount}</b> {likeCount === 1 ? "Like" : "Likes"}
          </span>
        </div>
        {footer}
      </article>
    );
  }

  return (
    <article className={`${styles.tweet} ${styles.clickable}`} onClick={openTweet}>
      <Link href={authorLink} className={styles.avatarLink} aria-label={`${author.name}'s profile`}>
        <img src={author.avatar} alt="" className={styles.profilePic} />
      </Link>
      <div className={styles.body}>
        <div className={styles.tweetHeader}>
          <Link href={authorLink} className={styles.nameLink}>
            <span className={styles.username}>{author.name}</span>
          </Link>
          <Link href={authorLink} className={`${styles.nameLink} ${styles.handleLink}`}>
            <span className={styles.handle}>@{author.handle}</span>
          </Link>
          <span className={styles.dot}>·</span>
          <Link href={tweetHref(tweet.id)} className={styles.dateLink}>
            {formatDate(tweet.createdAt)}
          </Link>
          {menu}
        </div>

        {content}
        {footer}
      </div>
    </article>
  );
};

export default Tweet;
