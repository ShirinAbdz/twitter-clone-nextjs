import { useEffect, useState } from "react";
import Link from "next/link";
import PageHeader from "@/Components/Layout/PageHeader";
import { SkeletonList } from "@/Components/Layout/TweetSkeleton";
import { useApp } from "@/Components/context/AppContext";
import { formatDate } from "@/Components/lib/format";
import { tweetHref } from "@/Components/lib/links";
import styles from "@/Components/styles/notifications.module.css";

// There is no server, so these come from the simulation in AppContext:
// sample accounts like and repost your tweets every so often.
export default function NotificationsPage() {
  const { hydrated, notifications, unreadCount, markNotificationsRead, clearNotifications, tweetById, getAuthor } =
    useApp();
  // The ones that were unread when you opened the page stay highlighted.
  const [fresh, setFresh] = useState(null);

  useEffect(() => {
    if (!hydrated) return;
    if (fresh === null) setFresh(new Set(notifications.filter((n) => !n.read).map((n) => n.id)));
    if (unreadCount > 0) markNotificationsRead();
  }, [hydrated, notifications, unreadCount, fresh, markNotificationsRead]);

  const clearButton =
    notifications.length > 0 ? (
      <button className={styles.clear} onClick={clearNotifications}>
        Clear all
      </button>
    ) : null;

  return (
    <div>
      <PageHeader title="Notifications" action={clearButton} />

      {!hydrated ? (
        <SkeletonList count={3} />
      ) : notifications.length === 0 ? (
        <div className={styles.empty}>
          <h2>Nothing yet</h2>
          <p>Post something. Likes and reposts on your tweets will show up here.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {notifications.map((n) => {
            const tweet = tweetById.get(n.tweetId);
            if (!tweet) return null;
            const actor = getAuthor(n.actor);
            const isLike = n.type === "like";
            return (
              <li key={n.id}>
                <Link
                  href={tweetHref(n.tweetId)}
                  className={`${styles.row} ${fresh && fresh.has(n.id) ? styles.unread : ""}`}
                >
                  <img
                    className={`${styles.kind} ${isLike ? "" : styles.repost}`}
                    src={isLike ? "/liked.svg" : "/retweet.svg"}
                    alt=""
                  />
                  <div className={styles.content}>
                    <img className={styles.avatar} src={actor.avatar} alt="" />
                    <p className={styles.line}>
                      <b dir="auto">{actor.name}</b> {isLike ? "liked" : "reposted"} your post ·{" "}
                      <span className={styles.time}>{formatDate(n.createdAt)}</span>
                    </p>
                    {tweet.text && (
                      <p className={styles.excerpt} dir="auto">
                        {tweet.text}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <p className={styles.note}>Activity here is simulated in your browser. There’s no server.</p>
    </div>
  );
}
