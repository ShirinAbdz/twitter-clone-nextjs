import Dashboard from "../Columns/Dashboard";
import Content from "../Columns/Content";
import Suggestions from "../Columns/Suggestions";
import styles from "./Layout.module.css"
const Layout= ()=> {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.column}> <Dashboard /> </div>
        <div id={styles.column2}className={styles.column}> <Content /></div>
        <div className={styles.column}> <Suggestions /> </div>
      </div>
    </div>
  );
}

export default Layout;