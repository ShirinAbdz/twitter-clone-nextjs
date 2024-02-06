import styles from "../Components/styles/Content.module.css";
import Image from "next/image";
import Tabs from "../Components/Layout/tabs";
import Tweet from "@/Components/Layout/tweet";

function Profile() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Image
            src="/header.jfif"
            alt="header bg"
            width={1000}
            height={500}
            id={styles.headerImage}
            priority
          />
          <Image
            src="/profile.jpg"
            width={500}
            height={200}
            alt="profile bg"
            id={styles.profileImage}
          />
          <button className={styles.editProfileButton}>Edit profile</button>
        </div>

        <div className={styles.biography}>
          <h2>Shirin</h2>
          <p id={styles.accountId}>@Shirin_abdz</p>
          <span>
            🎯 Classic Creative Artistic Curious Emerging Frontend Developer
          </span>

          <div className={styles.information}>
            <div className={styles.details}>
              <img src="/location.svg" alt="location" />
              <span>Iran</span>
            </div>
            <div className={styles.details}>
              <img src="/date.svg" alt="date" />
              <span>Joined June 2020</span>
            </div>
          </div>

          <div className={styles.followPart}>
            <button className={styles.following}>
              <span>1264</span>
              <a href="#">Following</a>
            </button>
            <button className={styles.follower}>
              <span>2497</span>
              <a href="#">Followers</a>
            </button>
          </div>
        </div>
        <div className={styles.cotentSection}>
          <Tabs />
        </div>
      </div>
    </div>
  );
}

export default Profile;
