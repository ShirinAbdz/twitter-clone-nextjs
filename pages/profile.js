import ProfileView from "@/Components/Layout/ProfileView";
import { useApp } from "@/Components/context/AppContext";

export default function ProfilePage() {
  const { profile } = useApp();
  return <ProfileView handle={profile.handle} />;
}
