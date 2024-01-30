import styles from "./style/Content.module.css";


function Content() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/header.jfif" alt="header bg" id={styles.headerImage} />
          <img src="/profile.jpg" alt="profile bg" id={styles.profileImage} />
          <button className={styles.editProfileButton}>Edit profile</button>
        </div>

        <div className={styles.biography}>
          <h2>Shirin</h2>
          <p id={styles.accountId}>@Shirin_abdz</p>
          <p>
            🎯 Classic Creative Artistic Curious Emerging Frontend Developer
          </p>
          <div className={styles.information}>
            <div>
              <img src="/location.svg" alt="" />
              <span>Iran</span>
            </div>
            <div>
              <img src="/date.svg" alt="" />
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
       
      </div>
      
    </div>
  );
}

export default Content;
