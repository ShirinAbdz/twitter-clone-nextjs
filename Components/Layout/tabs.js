import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tweet from "./tweet";
import { useApp } from "../context/AppContext";

const tabSx = { textTransform: "none", fontWeight: 700, fontSize: "1rem", color: "var(--text)" };

function TabPanel({ value, index, children }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`}>
      {value === index && children}
    </div>
  );
}

function Empty({ text }) {
  return <p style={{ padding: 30, textAlign: "center", color: "var(--text-muted)" }}>{text}</p>;
}

export default function ProfileTabs() {
  const { tweets, liked, retweeted, profile } = useApp();
  const [value, setValue] = React.useState(0);

  const myTweets = tweets.filter(
    (t) => t.author === profile.handle || retweeted.includes(t.id)
  );
  const likedTweets = tweets.filter((t) => liked.includes(t.id));

  const a11y = (i) => ({ id: `profile-tab-${i}`, "aria-controls": `profile-tabpanel-${i}` });

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={(_, v) => setValue(v)}
        aria-label="Profile tabs"
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        sx={{ borderBottom: "1px solid var(--border)", color: "var(--text)" }}
      >
        <Tab label="Tweets" sx={tabSx} {...a11y(0)} />
        <Tab label="Liked Tweets" sx={tabSx} {...a11y(1)} />
      </Tabs>

      <TabPanel value={value} index={0}>
        {myTweets.length === 0 ? (
          <Empty text="You haven't posted anything yet." />
        ) : (
          myTweets.map((t) => <Tweet key={t.id} tweet={t} />)
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {likedTweets.length === 0 ? (
          <Empty text="Tweets you like will show up here." />
        ) : (
          likedTweets.map((t) => <Tweet key={t.id} tweet={t} />)
        )}
      </TabPanel>
    </Box>
  );
}
