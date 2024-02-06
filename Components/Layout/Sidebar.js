// import React from "react";
// import { useRouter } from "next/router";
// import styles from "../styles/Sidebar.module.css";
// import Link from "next/link";

// const Sidebar = ({ onSidebarClick }) => {
//   const router = useRouter();

//   const handleHomeClick = (event) => {
//     event.preventDefault();
//     onSidebarClick("home");
//     router.push("/home").catch((err) => {
//       console.error("Error navigating to /home:", err);
//     });
//   };

//   return (
//     <div>
//       <div className={styles.DashboardContiner}>
//         <button id={styles.Logo}>
//           <img src="/logo.svg" alt="X logo" />
//         </button>

//         <Link href="/HomePage" passHref legacyBehavior>
//           <a onClick={handleHomeClick}>
//             <img src="/home.svg" alt="Home icon" />
//             <p>Home</p>
//           </a>
//         </Link>
//         <button>
//           <img src="/explore.svg" alt="explore icon" />
//           <p>Explore</p>
//         </button>
//         <button>
//           <img src="/notification.svg" alt="notif icon" />
//           <p>Notification</p>
//         </button>
//         <button>
//           <img src="/message.svg" alt="Messages icon" />
//           <p>Messages</p>
//         </button>
//         <button>
//           <img src="/list.svg" alt="Lists icon" />
//           <p>Lists</p>
//         </button>
//         <button>
//           <img src="/bookmark.svg" alt="Bookmarks icon" />
//           <p>Bookmarks</p>
//         </button>
//         <button>
//           <img src="/community.svg" alt="Communities icon" />
//           <p>Communities</p>
//         </button>

//         <button>
//           <img src="/profile.svg" alt="Profile icon" />
//           <p>Profile</p>
//         </button>

//         <button>
//           <img src="/more.svg" alt="More icon" />
//           <p>More</p>
//         </button>
//         <button id={styles.PostButton}>
//           <img src="/post.svg" alt="Post icon" />
//           <p>Post</p>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// new code *****************

// Sidebar.js

import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/Sidebar.module.css";
import Link from "next/link";

const Sidebar = ({ onSidebarClick }) => {
  const router = useRouter();

  const handleHomeClick = (event) => {
    event.preventDefault();
    onSidebarClick("home");
    router.push("/home").catch((err) => {
      console.error("Error navigating to /home:", err);
    });
  };

  const handleProfileClick = (event) => {
    event.preventDefault();
    onSidebarClick("profile");
    router.push("/").catch((err) => {
      console.error("Error navigating to /:", err);
    });
  };

  return (
    <div>
      <div className={styles.DashboardContiner}>
        <button id={styles.Logo}>
          <img src="/logo.svg" alt="X logo" />
        </button>

        <Link href="/HomePage" passHref legacyBehavior>
          <a onClick={handleHomeClick}>
            <img src="/home.svg" alt="Home icon" />
            <p>Home</p>
          </a>
        </Link>

        <button>
          <img src="/explore.svg" alt="explore icon" />
          <p>Explore</p>
        </button>
        <button>
          <img src="/notification.svg" alt="notif icon" />
          <p>Notification</p>
        </button>
        <button>
          <img src="/message.svg" alt="Messages icon" />
          <p>Messages</p>
        </button>
        <button>
          <img src="/list.svg" alt="Lists icon" />
          <p>Lists</p>
        </button>
        <button>
          <img src="/bookmark.svg" alt="Bookmarks icon" />
          <p>Bookmarks</p>
        </button>
        <button>
          <img src="/community.svg" alt="Communities icon" />
          <p>Communities</p>
        </button>

        <Link href="/profile" passHref legacyBehavior>
          <a onClick={handleProfileClick}>
            <img src="/profile.svg" alt="Profile icon" />
            <p>Profile</p>
          </a>
        </Link>

        <button>
          <img src="/more.svg" alt="More icon" />
          <p>More</p>
        </button>
        <button id={styles.PostButton}>
          <img src="/post.svg" alt="Post icon" />
          <p>Post</p>
        </button>

       

      </div>
    </div>
  );
};

export default Sidebar;
