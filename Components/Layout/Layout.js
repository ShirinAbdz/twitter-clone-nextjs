import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';
import Suggestions from './Suggestions';
import styles from "../styles/Layout.module.css";

const Layout = () => {
  const [currentContent, setCurrentContent] = useState('profile'); // Default content

  const handleSidebarClick = (option) => {
    setCurrentContent(option);
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.column}>
          <Sidebar onSidebarClick={handleSidebarClick} />
        </div>
        <div id={styles.column2} className={styles.column}>
          <Content currentContent={currentContent} />
        </div>
        <div className={styles.column}>
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default Layout;

// components/Layout.js
// import Sidebar from "./Sidebar";
// import Content from "./Content";
// import Suggestions from "./Suggestions";
// import styles from "../styles/Layout.module.css";
// import HomePage from "./HomeContent";
// import Link from "next/link";

// const Layout = ({ children }) => {
//   return (
//     <div>
//       <div className={styles.container}>
//         <div className={styles.column}>
//           <Sidebar />
//         </div>
//         <div id={styles.column2} className={styles.column}>
//           <HomePage />
//           {children}
//         </div>
//         <div className={styles.column}>
//           <Suggestions />
//         </div>
//       </div>
//     </div>
//   );
// // };

// export default Layout;

// components/Layout.js
