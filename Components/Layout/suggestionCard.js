import styles from "../styles/Suggestions.module.css";
import { useApp } from "../context/AppContext";

function SuggestionCard({ handle, imageSrc, name }) {
  const { following, toggleFollow } = useApp();
  const isFollowing = following.includes(handle);

  return (
    <div className={styles.suggestedAccount}>
      <img src={imageSrc} alt={name} className={styles.profileImage} />
      <div className={styles.information}>
        <p className={styles.name}>{name}</p>
        <p className={styles.handle}>@{handle}</p>
      </div>
      <button
        className={`${styles.FollowButton} ${isFollowing ? styles.following : ""}`}
        onClick={() => toggleFollow(handle)}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default SuggestionCard;
