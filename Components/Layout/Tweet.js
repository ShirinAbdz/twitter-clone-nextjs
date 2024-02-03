import React from 'react';
import styles from "../styles/Tweet.module.css"; 

const Tweet = ({ username, content, date }) => {
  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <img src="/profile-pic.jpg" alt="Profile" className={styles.profilePic} />
        <span className={styles.username}>{username}</span>
      </div>
      <div className={styles.tweetContent}>
        <p>{content}</p>
      </div>
      <div className={styles.tweetFooter}>
        <span className={styles.tweetDate}>{date}</span>
        <button className={styles.likeButton}>Like</button>
      </div>
    </div>
  );
};

export default Tweet;
