// Search helpers for the Explore page.
//
// Supported in the search box:
//   words           -> match tweet text, author name or handle
//   #tag            -> tweets (or hashtags) containing that tag
//   @handle         -> tweets mentioning that handle, and people named like it
//   from:handle     -> tweets written by that handle
//   has:image       -> tweets with a photo
//   has:poll        -> tweets with a poll

// Makes Persian/Arabic and Latin text comparable: no diacritics, no ZWNJ,
// unified Arabic/Persian letter forms, Latin digits, lower case.
export function normalize(input = "") {
  return String(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f\u064b-\u065f\u0640\u200c\u200d]/g, "")
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .toLowerCase();
}

const TAG_RE = /#([\p{L}\p{N}_\u200c]+)/gu;

export function getHashtags(text = "") {
  return [...text.matchAll(TAG_RE)].map((m) => m[1]).filter((tag) => !/^\d+$/.test(tag));
}

export function parseQuery(raw = "") {
  const f = { from: "", hasImage: false, hasPoll: false, tags: [], mentions: [], terms: [] };
  for (const token of raw.trim().split(/\s+/).filter(Boolean)) {
    const lower = token.toLowerCase();
    if (lower.startsWith("from:")) {
      f.from = normalize(token.slice(5).replace(/^@/, ""));
    } else if (lower === "has:image" || lower === "has:media") {
      f.hasImage = true;
    } else if (lower === "has:poll") {
      f.hasPoll = true;
    } else if (token.length > 1 && token[0] === "#") {
      f.tags.push(normalize(token.slice(1)));
    } else if (token.length > 1 && token[0] === "@") {
      f.mentions.push(normalize(token.slice(1)));
    } else {
      f.terms.push(normalize(token));
    }
  }
  return f;
}

export function matchTweet(tweet, author, f) {
  if (f.hasImage && !tweet.image) return false;
  if (f.hasPoll && !tweet.poll) return false;
  const handle = normalize(author.handle);
  if (f.from && !handle.includes(f.from)) return false;

  const text = normalize(tweet.text);
  if (f.tags.length) {
    const tags = getHashtags(tweet.text).map(normalize);
    if (!f.tags.every((t) => tags.some((x) => x.includes(t)))) return false;
  }
  if (f.mentions.length && !f.mentions.every((m) => text.includes(`@${m}`))) return false;

  const haystack = `${text} ${normalize(author.name)} ${handle}`;
  return f.terms.every((t) => haystack.includes(t));
}

// Hashtags used across all tweets, most used first. "#Gratitude" and
// "#gratitude" count as the same tag.
export function extractHashtags(tweets) {
  const map = new Map();
  for (const tweet of tweets) {
    const seen = new Set();
    for (const tag of getHashtags(tweet.text)) {
      const key = normalize(tag);
      if (seen.has(key)) continue;
      seen.add(key);
      const entry = map.get(key);
      if (entry) entry.count += 1;
      else map.set(key, { key, tag, count: 1 });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function searchHashtags(allTags, f) {
  const needles = [...f.tags, ...f.terms];
  if (needles.length === 0) return [];
  return allTags.filter((t) => needles.every((n) => t.key.includes(n)));
}

export function searchUsers(users, f) {
  const needles = [...f.terms, ...f.mentions, f.from].filter(Boolean);
  if (needles.length === 0) return [];
  return users
    .filter((u) => {
      const hay = `${normalize(u.name)} ${normalize(u.handle)}`;
      return needles.every((n) => hay.includes(n));
    })
    .sort((a, b) => {
      const aStarts = needles.some((n) => normalize(a.handle).startsWith(n) || normalize(a.name).startsWith(n));
      const bStarts = needles.some((n) => normalize(b.handle).startsWith(n) || normalize(b.name).startsWith(n));
      return Number(bStarts) - Number(aStarts);
    });
}
