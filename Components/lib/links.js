// One place that decides where links go.

export const profileHref = (handle, ownHandle) =>
  handle === ownHandle ? "/profile" : `/user/${encodeURIComponent(handle)}`;

export const tweetHref = (id) => `/tweet/${id}`;

export const replyHref = (id) => ({ pathname: `/tweet/${id}`, query: { reply: "1" } });

export const hashtagHref = (tag) => ({ pathname: "/explore", query: { q: `#${tag}` } });
