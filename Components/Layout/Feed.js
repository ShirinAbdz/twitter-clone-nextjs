import React, { useEffect, useRef, useState } from "react";
import Tweet from "./tweet";
import { SkeletonList } from "./TweetSkeleton";
import { useApp } from "../context/AppContext";

const PAGE_SIZE = 6;
const FAKE_LATENCY_MS = 650;
const FIRST_LOAD_MS = 700;

// Only the very first feed of a page load pretends to be slow.
let firstLoadDone = false;

function Message({ children }) {
  return <p style={{ padding: 30, textAlign: "center", color: "var(--text-muted)" }}>{children}</p>;
}

// A list of tweets with infinite scroll: tweets are shown a page at a time and
// the next page loads (behind a skeleton) when you get near the bottom.
export default function Feed({ tweets, emptyText = "Nothing here yet.", pageSize = PAGE_SIZE, firstLoadSkeleton = false }) {
  const { hydrated } = useApp();
  const [count, setCount] = useState(pageSize);
  const [loadingMore, setLoadingMore] = useState(false);
  const [booting, setBooting] = useState(firstLoadSkeleton && !firstLoadDone);
  const sentinel = useRef(null);

  const hasMore = count < tweets.length;
  const ready = hydrated && !booting;

  // First visit: show skeletons for a moment.
  useEffect(() => {
    if (!booting) return;
    const timer = setTimeout(() => {
      firstLoadDone = true;
      setBooting(false);
    }, FIRST_LOAD_MS);
    return () => clearTimeout(timer);
  }, [booting]);

  // Watch an invisible marker under the list. It is created again after each
  // page loads, so if the marker is still on screen the next page follows.
  useEffect(() => {
    if (!ready || !hasMore || loadingMore) return;
    const el = sentinel.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setLoadingMore(true);
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ready, hasMore, loadingMore, count]);

  // There is no server, so the delay is only for show.
  useEffect(() => {
    if (!loadingMore) return;
    const timer = setTimeout(() => {
      setCount((c) => c + pageSize);
      setLoadingMore(false);
    }, FAKE_LATENCY_MS);
    return () => clearTimeout(timer);
  }, [loadingMore, pageSize]);

  if (!ready) return <SkeletonList count={5} />;
  if (tweets.length === 0) return <Message>{emptyText}</Message>;

  return (
    <div>
      {tweets.slice(0, count).map((t) => (
        <Tweet key={t.id} tweet={t} />
      ))}
      {hasMore && <div ref={sentinel} aria-hidden="true" style={{ height: 1 }} />}
      {loadingMore && <SkeletonList count={2} />}
      {!hasMore && tweets.length > pageSize && <Message>You're all caught up.</Message>}
    </div>
  );
}
