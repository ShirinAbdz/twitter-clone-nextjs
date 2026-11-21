import { useMemo } from "react";
import PageHeader from "@/Components/Layout/PageHeader";
import Feed from "@/Components/Layout/Feed";
import { useApp } from "@/Components/context/AppContext";

export default function BookmarksPage() {
  const { bookmarks, tweetById, profile } = useApp();

  // Most recently saved first.
  const saved = useMemo(
    () => bookmarks.map((id) => tweetById.get(id)).filter(Boolean),
    [bookmarks, tweetById]
  );

  return (
    <div>
      <PageHeader title="Bookmarks" subtitle={`@${profile.handle}`} />
      <Feed
        tweets={saved}
        emptyText="Nothing saved yet. Tap the bookmark icon on a tweet to keep it here."
      />
    </div>
  );
}
