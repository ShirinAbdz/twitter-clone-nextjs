// Sidebar.js

import React from 'react';
import { useRouter } from 'next/router';  // Import useRouter
import styles from "../styles/Sidebar.module.css";

const Sidebar = ({ onSidebarClick }) => {
  const router = useRouter();  // Initialize useRouter

  const handleHomeClick = () => {
    const currentRoute = router.pathname;

    if (currentRoute !== '/home') {
      onSidebarClick('home');  // Optional: You can still call onSidebarClick if needed
      router.push('/home');    // Use router.push to navigate to '/home'
    }
  };

  return (
    <div>
      <div className={styles.DashboardContiner}>
        <button id={styles.Logo}>
          <img src="/logo.svg" alt="X logo" />
        </button>

        <button onClick={handleHomeClick}>
          <img src="/home.svg" alt="Home icon" />
          <p>Home</p>
        </button>

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
          <img src="/community.svg" alt="Communities icon" onClick={() => onSidebarClick('profile')}/>
          <p>Communities</p>
        </button>
        <button>
          <img src="/profile.svg" alt="Profile icon" />
          <p>Profile</p>
        </button>
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
