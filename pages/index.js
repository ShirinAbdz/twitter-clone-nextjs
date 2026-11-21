import { useMemo } from "react";
import ComposeBox from "@/Components/Layout/ComposeBox";
import HomeHeader from "@/Components/Layout/HomeHeader";
import Feed from "@/Components/Layout/Feed";
import { useApp } from "@/Components/context/AppContext";

export default function HomePage() {
  const { tweets } = useApp();
  // Replies live on their tweet's page, not in the home feed.
  const feed = useMemo(() => tweets.filter((t) => !t.replyTo), [tweets]);

  return (
    <div>
      <HomeHeader />
      <ComposeBox />
      <Feed tweets={feed} firstLoadSkeleton emptyText="No tweets yet. Write the first one!" />
    </div>
  );
}
