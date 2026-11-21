import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Tweet from "@/Components/Layout/tweet";
import ComposeBox from "@/Components/Layout/ComposeBox";
import PageHeader from "@/Components/Layout/PageHeader";
import Feed from "@/Components/Layout/Feed";
import { SkeletonList } from "@/Components/Layout/TweetSkeleton";
import { useApp } from "@/Components/context/AppContext";

// One tweet on its own page: the tweet it replies to (if any), the tweet itself,
// a reply box and the thread of replies.
export default function TweetPage() {
  const router = useRouter();
  const { hydrated, tweets, tweetById } = useApp();
  const id = router.isReady ? String(router.query.id) : null;
  const tweet = hydrated && id ? tweetById.get(id) : null;

  const ancestors = useMemo(() => {
    const chain = [];
    let current = tweet;
    for (let i = 0; current && current.replyTo && i < 30; i++) {
      const parent = tweetById.get(current.replyTo);
      if (!parent) break;
      chain.unshift(parent);
      current = parent;
    }
    return chain;
  }, [tweet, tweetById]);

  const replies = useMemo(
    () => (id ? tweets.filter((t) => t.replyTo === id).sort((a, b) => b.createdAt - a.createdAt) : []),
    [tweets, id]
  );

  if (!hydrated || !id) {
    return (
      <div>
        <PageHeader title="Post" back />
        <SkeletonList count={3} />
      </div>
    );
  }

  if (!tweet) {
    return (
      <div>
        <PageHeader title="Post" back />
        <div style={{ padding: 30, textAlign: "center" }}>
          <h2 style={{ marginBottom: 8 }}>This post doesn’t exist</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 16 }}>It may have been deleted.</p>
          <Link href="/" style={{ color: "var(--accent)", fontWeight: 700 }}>
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Post" back />
      {ancestors.map((t) => (
        <Tweet key={t.id} tweet={t} />
      ))}
      <Tweet key={tweet.id} tweet={tweet} detail />
      <ComposeBox
        key={tweet.id}
        replyTo={tweet.id}
        placeholder="Post your reply"
        submitLabel="Reply"
        inputId="reply-input"
        autoFocus={router.query.reply === "1"}
      />
      <Feed key={tweet.id} tweets={replies} emptyText="No replies yet. Be the first to reply!" />
    </div>
  );
}
