import { useRouter } from "next/router";
import ProfileView from "@/Components/Layout/ProfileView";
import PageHeader from "@/Components/Layout/PageHeader";
import { SkeletonList } from "@/Components/Layout/TweetSkeleton";
import { useApp } from "@/Components/context/AppContext";

// Anyone else's profile. The URL is /user/<handle>.
export default function UserPage() {
  const router = useRouter();
  const { hydrated, handleMap } = useApp();

  if (!router.isReady || !hydrated) {
    return (
      <div>
        <PageHeader title="Profile" back />
        <SkeletonList count={4} />
      </div>
    );
  }

  const raw = String(router.query.handle || "");
  // Be forgiving about upper/lower case in the address.
  const handle = handleMap.get(raw.toLowerCase()) || raw;

  // key resets the tab selection when you jump from one profile to another.
  return <ProfileView key={handle} handle={handle} />;
}
