import styles from "../styles/Suggestions.module.css";
import PropTypes from "prop-types";

function SuggestionCard({ imageSrc, name, id }) {
  return (
    <div>
      <div className={styles.suggestedAccount}>
        <img src={imageSrc} alt="Profile" className={styles.profileImage} />
        <div className={styles.information}>
        <p id={styles.name}>{name}</p>
        <p id={styles.id}>{id}</p>
        </div>
        <button className={styles.FollowButton}>Follow</button>
      </div>
    </div>
  );
} 


SuggestionCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default SuggestionCard;
