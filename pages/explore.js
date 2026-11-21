import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageHeader from "@/Components/Layout/PageHeader";
import Feed from "@/Components/Layout/Feed";
import AppTabs, { TabPanel } from "@/Components/Layout/AppTabs";
import SuggestionCard from "@/Components/Layout/suggestionCard";
import { useApp } from "@/Components/context/AppContext";
import { hashtagHref } from "@/Components/lib/links";
import { extractHashtags, matchTweet, parseQuery, searchHashtags, searchUsers } from "@/Components/lib/search";
import styles from "@/Components/styles/explore.module.css";

const postsLabel = (n) => `${n} ${n === 1 ? "post" : "posts"}`;

function Empty({ children }) {
  return <p className={styles.empty}>{children}</p>;
}

function TagRow({ tag, count, rank }) {
  return (
    <Link href={hashtagHref(tag)} className={styles.tagRow}>
      <span className={styles.tagMeta}>{rank ? `${rank} · Trending` : "Hashtag"}</span>
      <span className={styles.tagName} dir="auto">
        #{tag}
      </span>
      <span className={styles.tagMeta}>{postsLabel(count)}</span>
    </Link>
  );
}

export default function ExplorePage() {
  const router = useRouter();
  const { tweets, users, getAuthor, query, setQuery, profile } = useApp();
  const [tab, setTab] = useState(0);

  // The address (?q=...) is how hashtag links and the search box's Enter key
  // hand a search to this page.
  const qParam = router.isReady ? String(router.query.q ?? "") : null;
  useEffect(() => {
    if (qParam === null) return;
    setQuery(qParam);
    setTab(0);
  }, [qParam, setQuery]);

  const text = query.trim();
  const parsed = useMemo(() => parseQuery(text), [text]);
  const allTags = useMemo(() => extractHashtags(tweets), [tweets]);

  const tweetResults = useMemo(
    () => (text ? tweets.filter((t) => matchTweet(t, getAuthor(t.author), parsed)) : []),
    [text, tweets, parsed, getAuthor]
  );
  const peopleResults = useMemo(() => (text ? searchUsers(users, parsed) : []), [text, users, parsed]);
  const tagResults = useMemo(() => (text ? searchHashtags(allTags, parsed) : []), [text, allTags, parsed]);

  const trending = allTags.slice(0, 10);
  const whoToFollow = users.filter((u) => !u.isMe).slice(0, 6);

  return (
    <div>
      <PageHeader title="Explore" withSearch />

      {!text ? (
        <div>
          <section className={styles.section}>
            <h2>Trending hashtags</h2>
            {trending.length === 0 ? (
              <Empty>Hashtags from tweets will show up here.</Empty>
            ) : (
              trending.map((t, i) => <TagRow key={t.key} tag={t.tag} count={t.count} rank={i + 1} />)
            )}
          </section>

          <section className={styles.section}>
            <h2>Who to follow</h2>
            {whoToFollow.map((u) => (
              <div key={u.handle} className={styles.person}>
                <SuggestionCard handle={u.handle} name={u.name} imageSrc={u.avatar} />
              </div>
            ))}
          </section>

          <section className={styles.tips}>
            <h2>Search tips</h2>
            <p>
              Type a name or word, <code>#tag</code> or <code>@handle</code>. Narrow it down with{" "}
              <code>from:handle</code>, <code>has:image</code> or <code>has:poll</code>.
            </p>
          </section>
        </div>
      ) : (
        <div>
          <AppTabs
            name="explore"
            value={tab}
            onChange={setTab}
            labels={[`Posts (${tweetResults.length})`, `People (${peopleResults.length})`, `Hashtags (${tagResults.length})`]}
          />

          <TabPanel name="explore" value={tab} index={0}>
            <Feed key={text} tweets={tweetResults} emptyText={`No posts match “${text}”.`} />
          </TabPanel>

          <TabPanel name="explore" value={tab} index={1}>
            {peopleResults.length === 0 ? (
              <Empty>No people match “{text}”.</Empty>
            ) : (
              peopleResults.map((u) => (
                <div key={u.handle} className={styles.person}>
                  <SuggestionCard handle={u.handle} name={u.name} imageSrc={u.avatar} />
                </div>
              ))
            )}
          </TabPanel>

          <TabPanel name="explore" value={tab} index={2}>
            {tagResults.length === 0 ? (
              <Empty>No hashtags match “{text}”.</Empty>
            ) : (
              tagResults.map((t) => <TagRow key={t.key} tag={t.tag} count={t.count} />)
            )}
          </TabPanel>
        </div>
      )}
    </div>
  );
}
