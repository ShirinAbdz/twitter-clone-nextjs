import Link from "next/link";
import styles from "../styles/Suggestions.module.css";
import { useApp } from "../context/AppContext";
import { profileHref } from "../lib/links";

// A person with a follow button. Clicking the photo or name opens their profile.
function SuggestionCard({ handle, imageSrc, name }) {
  const { following, toggleFollow, profile } = useApp();
  const isFollowing = following.includes(handle);
  const isMe = handle === profile.handle;
  const href = profileHref(handle, profile.handle);

  return (
    <div className={styles.suggestedAccount}>
      <Link href={href} className={styles.plainLink} aria-label={`${name}'s profile`}>
        <img src={imageSrc} alt="" className={styles.profileImage} />
      </Link>
      <Link href={href} className={`${styles.plainLink} ${styles.information}`}>
        <p className={styles.name} dir="auto">{name}</p>
        <p className={styles.handle}>@{handle}</p>
      </Link>
      {!isMe && (
        <button
          className={`${styles.FollowButton} ${isFollowing ? styles.following : ""}`}
          onClick={() => toggleFollow(handle)}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
}

export default SuggestionCard;
