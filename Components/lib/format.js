// Small formatting helpers shared by tweets, notifications and profiles.

export function formatDate(ts) {
  const diff = Date.now() - ts;
  // Only brand-new tweets (created in this browser) can be "recent",
  // so this never causes a server/client mismatch.
  if (diff >= 0 && diff < 60 * 1000) return "now";
  if (diff >= 0 && diff < 60 * 60 * 1000) return `${Math.floor(diff / 60000)}m`;
  if (diff >= 0 && diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / 3600000)}h`;
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

// Only used on pages that render after the saved data has loaded (tweet page),
// so using the visitor's own time zone cannot cause a hydration mismatch.
export function formatFullDate(ts) {
  return new Date(ts).toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTimeLeft(endsAt) {
  const ms = endsAt - Date.now();
  if (ms <= 0) return "Final results";
  const min = Math.ceil(ms / 60000);
  if (min < 60) return `${min}m left`;
  const hours = Math.ceil(min / 60);
  if (hours < 24) return `${hours}h left`;
  return `${Math.ceil(hours / 24)}d left`;
}

// A stable colour pair for people without a header photo.
export function gradientFor(handle = "") {
  let hash = 0;
  for (let i = 0; i < handle.length; i++) hash = (hash * 31 + handle.charCodeAt(i)) % 360;
  return `linear-gradient(135deg, hsl(${hash} 65% 52%), hsl(${(hash + 45) % 360} 70% 42%))`;
}
