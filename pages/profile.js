import { useState } from "react";
import styles from "@/Components/styles/Content.module.css";
import Tabs from "@/Components/Layout/tabs";
import EditProfileModal from "@/Components/Layout/EditProfileModal";
import { useApp } from "@/Components/context/AppContext";
import { BASE_FOLLOWERS, BASE_FOLLOWING } from "@/Components/data/seed";

export default function ProfilePage() {
  const { profile, following } = useApp();
  const [editing, setEditing] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={profile.header} alt="header background" id={styles.headerImage} />
        <div className={styles.avatarRow}>
          <img src={profile.avatar} alt="profile" id={styles.profileImage} />
          <button className={styles.editProfileButton} onClick={() => setEditing(true)}>
            Edit profile
          </button>
        </div>
      </div>

      <div className={styles.biography}>
        <h2>{profile.name}</h2>
        <p id={styles.accountId}>@{profile.handle}</p>
        {profile.bio && <span>{profile.bio}</span>}

        <div className={styles.information}>
          {profile.location && (
            <div className={styles.details}>
              <img src="/location.svg" alt="" />
              <span>{profile.location}</span>
            </div>
          )}
          <div className={styles.details}>
            <img src="/date.svg" alt="" />
            <span>Joined {profile.joined}</span>
          </div>
        </div>

        <div className={styles.followPart}>
          <span className={styles.following}>
            <b>{BASE_FOLLOWING + following.length}</b> Following
          </span>
          <span className={styles.follower}>
            <b>{BASE_FOLLOWERS}</b> Followers
          </span>
        </div>
      </div>

      <Tabs />

      {editing && <EditProfileModal onClose={() => setEditing(false)} />}
    </div>
  );
}
