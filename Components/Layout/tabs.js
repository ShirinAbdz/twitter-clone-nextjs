import * as React from "react";
import Feed from "./Feed";
import AppTabs, { TabPanel } from "./AppTabs";
import { useApp } from "../context/AppContext";

// Tweets / Replies for anyone, plus "Liked Tweets" on your own profile
// (likes are only tracked for the signed-in person).
export default function ProfileTabs({ handle, isMe }) {
  const { tweets, liked, retweeted } = useApp();
  const [value, setValue] = React.useState(0);

  const posts = tweets.filter(
    (t) => !t.replyTo && (t.author === handle || (isMe && retweeted.includes(t.id)))
  );
  const replies = tweets.filter((t) => t.replyTo && t.author === handle);
  const likedTweets = tweets.filter((t) => liked.includes(t.id));

  const labels = isMe ? ["Tweets", "Replies", "Liked Tweets"] : ["Tweets", "Replies"];

  return (
    <div style={{ width: "100%" }}>
      <AppTabs name="profile" value={value} onChange={setValue} labels={labels} />

      <TabPanel name="profile" value={value} index={0}>
        <Feed tweets={posts} emptyText={isMe ? "You haven't posted anything yet." : `@${handle} hasn't posted yet.`} />
      </TabPanel>
      <TabPanel name="profile" value={value} index={1}>
        <Feed tweets={replies} emptyText={isMe ? "Your replies will show up here." : `@${handle} hasn't replied to anyone yet.`} />
      </TabPanel>
      {isMe && (
        <TabPanel name="profile" value={value} index={2}>
          <Feed tweets={likedTweets} emptyText="Tweets you like will show up here." />
        </TabPanel>
      )}
    </div>
  );
}
