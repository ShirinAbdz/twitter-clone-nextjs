import SuggestionCard from "./suggestionCard";
import SearchBox from "./SearchBox";
import styles from "../styles/Suggestions.module.css";
import { SUGGESTED, USERS } from "../data/seed";

function Suggestions() {
  return (
    <div className={styles.suggestSection}>
      <SearchBox />

      <div className={styles.suggestedAccounts}>
        <h2>You might like</h2>
        <ul>
          {SUGGESTED.map((handle) => (
            <li className={styles.liTag} key={handle}>
              <SuggestionCard
                handle={handle}
                name={USERS[handle].name}
                imageSrc={USERS[handle].avatar}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Suggestions;
