import React, { useState } from "react";
import styles from "../styles/compose.module.css";
import { MAX_TWEET_LENGTH, useApp } from "../context/AppContext";

const ComposeBox = () => {
  const { profile, addTweet } = useApp();
  const [text, setText] = useState("");

  const remaining = MAX_TWEET_LENGTH - text.length;
  const canPost = text.trim().length > 0 && remaining >= 0;

  const submit = () => {
    if (!canPost) return;
    if (addTweet(text)) setText("");
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") submit();
  };

  return (
    <div className={styles.compose}>
      <img src={profile.avatar} alt={profile.name} className={styles.avatar} />
      <div className={styles.right}>
        <textarea
          id="compose-input"
          className={styles.input}
          placeholder="What is happening?!"
          value={text}
          rows={2}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.bottom}>
          <span className={`${styles.counter} ${remaining < 0 ? styles.over : ""}`}>
            {text.length > 0 ? remaining : ""}
          </span>
          <button className={styles.postButton} onClick={submit} disabled={!canPost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeBox;
