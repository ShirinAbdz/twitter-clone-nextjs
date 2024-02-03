import SuggestionCard from "./SuggestionCard";
import styles from "../styles/Suggestions.module.css";
function Suggestions() {
  return (
    <div>
      <div className={styles.suggestSection}>
        <div className={styles.searchBar}>
          <img src="/searchbar.svg" alt="search" />
          <input type="text" id={styles.searchInput} placeholder="Search" />
        </div>

        <div className={styles.suggestedAccounts}>
          <h2>You might like</h2>
          <ul>
            <li className={styles.liTag}>
              <SuggestionCard
                imageSrc="/bill.jpg"
                name="Bill Gates"
                id="@BillGates"
              />
            </li>
            <li className={styles.liTag}>
              <SuggestionCard
                name="Elon Musk"
                id="@elonmusk"
                imageSrc="/elon.webp"
              />
            </li>
            <li className={styles.liTag}>
              <SuggestionCard
                name="Mark Zuckerberg"
                id="@finkd"
                imageSrc="/mark.jfif"
              />
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.trendingBar}></div>
    </div>
  );
}

export default Suggestions;
