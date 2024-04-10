import React from "react";
import styles from "@/Components/styles/tweet.module.css";
import { useState } from "react";

const Tweet = ({ id, username, content, date, profileImage }) => {
  const renderContent = () => {
    if (!content) {
      return <p>No content available</p>;
    }
    const words = content.split(" ");

    const contentWithLinks = words.map((word, index) => {
      if (word.startsWith("@")) {
        return (
          <React.Fragment key={index}>
            <a
              href={`https://twitter.com/${word.substring(1)}`}
              className={styles.blueLink}
            >
              {word}
            </a>{" "}
          </React.Fragment>
        );
      } else if (word.startsWith("#")) {
        return (
          <React.Fragment key={index}>
            <a
              href={`https://twitter.com/hashtag/${word.substring(1)}`}
              className={styles.blueLink}
            >
              {word}
            </a>{" "}
          </React.Fragment>
        );
      } else {
        return <React.Fragment key={index}>{word} </React.Fragment>;
      }
    });

    return <p>{contentWithLinks}</p>;
  };

  const [like, setlike] = useState(false);

  const likeHandler = () => {
    setlike((like) => !like);
  };

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <span className={styles.id}> {id}</span>
        <img src={profileImage} alt="Profile" className={styles.profilePic} />
        <span className={styles.username}>{username}</span>
      </div>
      <div className={styles.tweetContent}>{renderContent()}</div>
      <div className={styles.tweetFooter}>
        <span className={styles.tweetDate}>{date}</span>
        <button className={styles.likeButton} onClick={likeHandler}>
          {like ? (
            <img src="/liked.svg" alt="Liked" />
          ) : (
            <img src="/like.svg" alt="Not Liked" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Tweet;
