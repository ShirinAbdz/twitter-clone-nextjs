import { useEffect } from "react";
import { useRouter } from "next/router";

// Old route kept so existing links still work.
export default function LegacyHome() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
