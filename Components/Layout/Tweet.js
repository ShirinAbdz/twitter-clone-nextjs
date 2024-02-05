import React from 'react';
import styles from "../styles/Tweet.module.css"; 

// const Tweet = ({ username, content, date, profileImage }) => {
//   return (
//     <div className={styles.tweet}>
//       <div className={styles.tweetHeader}>
//         <img src={profileImage} alt="Profile" className={styles.profilePic} />
//         <span className={styles.username}>{username}</span>
//       </div>
//       <div className={styles.tweetContent}>
//         <p>{content}</p>
//       </div>
//       <div className={styles.tweetFooter}>
//         <span className={styles.tweetDate}>{date}</span>
//         <button className={styles.likeButton}>Like</button>
//       </div>
//     </div>
//   );
// };

// export default Tweet;


const Tweet = ({ username, content, date, profileImage }) => {
  const renderContent = () => {
    // Split the content into words
    const words = content.split(' ');

    // Iterate through words and add the class to @mentions and #hashtags
    const contentWithLinks = words.map((word, index) => {
      if (word.startsWith('@')) {
        return (
          <React.Fragment key={index}>
            <a href={`https://twitter.com/${word.substring(1)}`} className={styles.blueLink}>
              {word}
            </a>{' '}
          </React.Fragment>
        );
      } else if (word.startsWith('#')) {
        return (
          <React.Fragment key={index}>
            <a href={`https://twitter.com/hashtag/${word.substring(1)}`} className={styles.blueLink}>
              {word}
            </a>{' '}
          </React.Fragment>
        );
      } else {
        return <React.Fragment key={index}>{word} </React.Fragment>;
      }
    });

    return <p>{contentWithLinks}</p>;
  };

  return (
    <div className={styles.tweet}>
      <div className={styles.tweetHeader}>
        <img src={profileImage} alt="Profile" className={styles.profilePic} />
        <span className={styles.username}>{username}</span>
      </div>
      <div className={styles.tweetContent}>{renderContent()}</div>
      <div className={styles.tweetFooter}>
        <span className={styles.tweetDate}>{date}</span>
        <button className={styles.likeButton}>Like</button>
      </div>
    </div>
  );
};

export default Tweet;
