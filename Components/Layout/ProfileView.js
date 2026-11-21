import React, { useState } from "react";
import styles from "@/Components/styles/Content.module.css";
import Tabs from "./tabs";
import PageHeader from "./PageHeader";
import EditProfileModal from "./EditProfileModal";
import { useApp } from "../context/AppContext";
import { BASE_FOLLOWERS, BASE_FOLLOWING } from "../data/seed";
import { gradientFor } from "../lib/format";

// The profile page for any account. Pass the current user's handle to get the
// editable version.
export default function ProfileView({ handle }) {
  const { profile, following, toggleFollow, getUser, tweets } = useApp();
  const [editing, setEditing] = useState(false);

  const isMe = handle === profile.handle;
  const user = isMe ? profile : getUser(handle);

  if (!user) {
    return (
      <div>
        <PageHeader title="Profile" back />
        <div className={styles.notFound}>
          <h2>This account doesn’t exist</h2>
          <p>Try searching for another name.</p>
        </div>
      </div>
    );
  }

  const isFollowing = following.includes(handle);
  const postCount = tweets.filter((t) => t.author === handle && !t.replyTo).length;

  // Your own counts start from a base; other accounts only show counts if the
  // sample data has them.
  let followingCount = null;
  let followerCount = null;
  if (isMe) {
    followingCount = BASE_FOLLOWING + following.length;
    followerCount = BASE_FOLLOWERS;
  } else if (typeof user.followers === "number") {
    followingCount = user.following;
    followerCount = user.followers + (isFollowing ? 1 : 0);
  }

  return (
    <div className={styles.container}>
      <PageHeader title={user.name} subtitle={`${postCount} ${postCount === 1 ? "post" : "posts"}`} back={!isMe} />

      <div className={styles.header}>
        {user.header ? (
          <img src={user.header} alt="" id={styles.headerImage} />
        ) : (
          <div className={styles.headerFallback} style={{ background: gradientFor(handle) }} />
        )}
        <div className={styles.avatarRow}>
          <img src={user.avatar || "/profile.svg"} alt={`${user.name}'s photo`} id={styles.profileImage} />
          {isMe ? (
            <button className={styles.editProfileButton} onClick={() => setEditing(true)}>
              Edit profile
            </button>
          ) : (
            <button
              className={`${styles.followButton} ${isFollowing ? styles.followingButton : ""}`}
              onClick={() => toggleFollow(handle)}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>
      </div>

      <div className={styles.biography}>
        <h2 dir="auto">{user.name}</h2>
        <p id={styles.accountId}>@{handle}</p>
        {user.bio && <span dir="auto">{user.bio}</span>}

        {(user.location || user.joined) && (
          <div className={styles.information}>
            {user.location && (
              <div className={styles.details}>
                <img className="invert-dark" src="/location.svg" alt="" />
                <span dir="auto">{user.location}</span>
              </div>
            )}
            {user.joined && (
              <div className={styles.details}>
                <img className="invert-dark" src="/date.svg" alt="" />
                <span>Joined {user.joined}</span>
              </div>
            )}
          </div>
        )}

        {followerCount !== null && (
          <div className={styles.followPart}>
            <span className={styles.following}>
              <b>{followingCount}</b> Following
            </span>
            <span className={styles.follower}>
              <b>{followerCount}</b> Followers
            </span>
          </div>
        )}
      </div>

      <Tabs handle={handle} isMe={isMe} />

      {isMe && editing && <EditProfileModal onClose={() => setEditing(false)} />}
    </div>
  );
}
