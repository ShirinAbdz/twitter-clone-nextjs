import Tweet from "@/Components/Layout/tweet";
import ComposeBox from "@/Components/Layout/ComposeBox";
import HomeHeader from "@/Components/Layout/HomeHeader";
import { useApp } from "@/Components/context/AppContext";

export default function HomePage() {
  const { tweets, query, getAuthor } = useApp();

  const q = query.trim().toLowerCase();
  const visible = q
    ? tweets.filter((t) => {
        const author = getAuthor(t.author);
        return (
          t.text.toLowerCase().includes(q) ||
          author.name.toLowerCase().includes(q) ||
          author.handle.toLowerCase().includes(q)
        );
      })
    : tweets;

  return (
    <div>
      <HomeHeader />
      <ComposeBox />
      {visible.length === 0 ? (
        <p style={{ padding: 30, textAlign: "center", color: "var(--text-muted)" }}>
          No tweets found.
        </p>
      ) : (
        visible.map((t) => <Tweet key={t.id} tweet={t} />)
      )}
    </div>
  );
}
