import Sidebar from "./Sidebar";
import Suggestions from "./Suggestions";
import styles from "../styles/Layout.module.css";
import HomePage from "../../pages/home";

const Layout = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.column}>
          <Sidebar />
        </div>
        <div id={styles.column2} className={styles.column}>
          {/* here i want to add a code to say if the user clicked on  */}
        </div>
        <div className={styles.column}>
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Layout;

components / Layout.js;
