import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { DEFAULT_PROFILE, SEED_TWEETS, SEED_VERSION, USERS } from "../data/seed";

const STORAGE_KEY = "twitter-clone:v1";
export const MAX_TWEET_LENGTH = 280;
const MAX_NOTIFICATIONS = 100;
const SIMULATION_INTERVAL_MS = 8000;

const initialState = {
  seedVersion: SEED_VERSION,
  tweets: SEED_TWEETS,
  liked: [],
  retweeted: [],
  bookmarks: [], // tweet ids, most recently saved first
  votes: {}, // { [tweetId]: optionId }
  notifications: [], // { id, type: "like" | "retweet", actor, tweetId, createdAt, read }
  following: [],
  profile: DEFAULT_PROFILE,
};

const toggle = (list, value) =>
  list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

// A tweet plus every reply (and reply to a reply...) under it.
function collectThread(tweets, rootId) {
  const ids = new Set([rootId]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const t of tweets) {
      if (t.replyTo && ids.has(t.replyTo) && !ids.has(t.id)) {
        ids.add(t.id);
        grew = true;
      }
    }
  }
  return ids;
}

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE": {
      const saved = action.payload || {};
      let tweets = Array.isArray(saved.tweets) ? saved.tweets : SEED_TWEETS;
      // Older saves don't know about newer seed tweets: add them once.
      if (saved.seedVersion !== SEED_VERSION) {
        const have = new Set(tweets.map((t) => t.id));
        tweets = [...tweets, ...SEED_TWEETS.filter((t) => !have.has(t.id))].sort(
          (a, b) => b.createdAt - a.createdAt
        );
      }
      return { ...initialState, ...saved, tweets, seedVersion: SEED_VERSION };
    }
    case "ADD_TWEET":
      return { ...state, tweets: [action.tweet, ...state.tweets] };
    case "DELETE_TWEET": {
      const gone = collectThread(state.tweets, action.id);
      const keep = (id) => !gone.has(id);
      return {
        ...state,
        tweets: state.tweets.filter((t) => keep(t.id)),
        liked: state.liked.filter(keep),
        retweeted: state.retweeted.filter(keep),
        bookmarks: state.bookmarks.filter(keep),
        votes: Object.fromEntries(Object.entries(state.votes).filter(([id]) => keep(id))),
        notifications: state.notifications.filter((n) => keep(n.tweetId)),
      };
    }
    case "TOGGLE_LIKE":
      return { ...state, liked: toggle(state.liked, action.id) };
    case "TOGGLE_RETWEET":
      return { ...state, retweeted: toggle(state.retweeted, action.id) };
    case "TOGGLE_BOOKMARK":
      return {
        ...state,
        bookmarks: state.bookmarks.includes(action.id)
          ? state.bookmarks.filter((id) => id !== action.id)
          : [action.id, ...state.bookmarks],
      };
    case "VOTE":
      if (state.votes[action.id]) return state; // one vote per poll
      return { ...state, votes: { ...state.votes, [action.id]: action.optionId } };
    case "TOGGLE_FOLLOW":
      return { ...state, following: toggle(state.following, action.handle) };
    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.changes } };
    case "ADD_NOTIFICATION": {
      const n = action.notification;
      const field = n.type === "like" ? "likes" : "retweets";
      return {
        ...state,
        tweets: state.tweets.map((t) => (t.id === n.tweetId ? { ...t, [field]: t[field] + 1 } : t)),
        notifications: [n, ...state.notifications].slice(0, MAX_NOTIFICATIONS),
      };
    }
    case "MARK_NOTIFICATIONS_READ":
      if (!state.notifications.some((n) => !n.read)) return state;
      return { ...state, notifications: state.notifications.map((n) => (n.read ? n : { ...n, read: true })) };
    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [query, setQuery] = useState("");
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Load saved data once, after mount (keeps server and client markup identical).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "HYDRATE", payload: JSON.parse(raw) });
    } catch (err) {
      console.error("Could not read saved data:", err);
    }
    setHydrated(true);
  }, []);

  // Save on every change, but only after the first load finished.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setSaveFailed(false);
    } catch (err) {
      // Most likely the browser's storage is full (photos are big).
      console.error("Could not save data:", err);
      setSaveFailed(true);
    }
  }, [state, hydrated]);

  // There is no server, so "other people" liking and reposting your tweets is
  // simulated: every few seconds one of the sample accounts reacts to one of
  // your tweets. Newer tweets are picked more often.
  useEffect(() => {
    if (!hydrated) return;
    const tick = () => {
      if (document.hidden) return;
      const s = stateRef.current;
      const mine = s.tweets.filter((t) => t.author === s.profile.handle);
      if (mine.length === 0 || Math.random() > 0.55) return;
      const actors = Object.keys(USERS).filter((h) => h !== s.profile.handle);

      for (let i = 0; i < 6; i++) {
        const tweet = mine[Math.floor(Math.random() ** 2 * mine.length)];
        const actor = actors[Math.floor(Math.random() * actors.length)];
        const type = Math.random() < 0.7 ? "like" : "retweet";
        const exists = s.notifications.some(
          (n) => n.tweetId === tweet.id && n.actor === actor && n.type === type
        );
        if (exists) continue;
        dispatch({
          type: "ADD_NOTIFICATION",
          notification: {
            id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            type,
            actor,
            tweetId: tweet.id,
            createdAt: Date.now(),
            read: false,
          },
        });
        return;
      }
    };
    const timer = setInterval(tick, SIMULATION_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [hydrated]);

  const addTweet = useCallback(
    ({ text = "", image = null, poll = null, replyTo = null } = {}) => {
      const clean = text.trim();
      if (clean.length > MAX_TWEET_LENGTH) return false;
      if (!clean && !image) return false;

      let pollData = null;
      if (poll) {
        const options = poll.options.map((o) => o.trim()).filter(Boolean);
        if (!clean || options.length < 2) return false;
        pollData = {
          endsAt: Date.now() + poll.durationMs,
          options: options.map((opt, i) => ({ id: `o${i}`, text: opt, votes: 0 })),
        };
      }

      dispatch({
        type: "ADD_TWEET",
        tweet: {
          id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          author: state.profile.handle,
          text: clean,
          createdAt: Date.now(),
          likes: 0,
          retweets: 0,
          ...(replyTo ? { replyTo } : {}),
          ...(image ? { image } : {}),
          ...(pollData ? { poll: pollData } : {}),
        },
      });
      return true;
    },
    [state.profile.handle]
  );

  const deleteTweet = useCallback((id) => dispatch({ type: "DELETE_TWEET", id }), []);
  const toggleLike = useCallback((id) => dispatch({ type: "TOGGLE_LIKE", id }), []);
  const toggleRetweet = useCallback((id) => dispatch({ type: "TOGGLE_RETWEET", id }), []);
  const toggleBookmark = useCallback((id) => dispatch({ type: "TOGGLE_BOOKMARK", id }), []);
  const vote = useCallback((id, optionId) => dispatch({ type: "VOTE", id, optionId }), []);
  const toggleFollow = useCallback((handle) => dispatch({ type: "TOGGLE_FOLLOW", handle }), []);
  const updateProfile = useCallback(
    (changes) => dispatch({ type: "UPDATE_PROFILE", changes }),
    []
  );
  const markNotificationsRead = useCallback(() => dispatch({ type: "MARK_NOTIFICATIONS_READ" }), []);
  const clearNotifications = useCallback(() => dispatch({ type: "CLEAR_NOTIFICATIONS" }), []);

  // Everyone who can be found: the sample accounts plus the current profile.
  const users = useMemo(
    () => [
      ...Object.entries(USERS).map(([handle, u]) => ({ handle, ...u })),
      { ...state.profile, isMe: true },
    ],
    [state.profile]
  );

  const handleMap = useMemo(() => new Map(users.map((u) => [u.handle.toLowerCase(), u.handle])), [users]);

  const getUser = useCallback(
    (handle) => users.find((u) => u.handle === handle) || null,
    [users]
  );

  const getAuthor = useCallback(
    (handle) => {
      if (handle === state.profile.handle) {
        return { handle, name: state.profile.name, avatar: state.profile.avatar };
      }
      const user = USERS[handle];
      return {
        handle,
        name: user?.name ?? handle,
        avatar: user?.avatar ?? "/profile.svg",
      };
    },
    [state.profile]
  );

  const tweetById = useMemo(() => new Map(state.tweets.map((t) => [t.id, t])), [state.tweets]);

  const replyCounts = useMemo(() => {
    const counts = {};
    for (const t of state.tweets) if (t.replyTo) counts[t.replyTo] = (counts[t.replyTo] || 0) + 1;
    return counts;
  }, [state.tweets]);

  const unreadCount = useMemo(
    () => state.notifications.filter((n) => !n.read).length,
    [state.notifications]
  );

  const value = useMemo(
    () => ({
      ...state,
      hydrated,
      saveFailed,
      query,
      setQuery,
      users,
      handleMap,
      tweetById,
      replyCounts,
      unreadCount,
      addTweet,
      deleteTweet,
      toggleLike,
      toggleRetweet,
      toggleBookmark,
      vote,
      toggleFollow,
      updateProfile,
      markNotificationsRead,
      clearNotifications,
      getUser,
      getAuthor,
    }),
    [
      state,
      hydrated,
      saveFailed,
      query,
      users,
      handleMap,
      tweetById,
      replyCounts,
      unreadCount,
      addTweet,
      deleteTweet,
      toggleLike,
      toggleRetweet,
      toggleBookmark,
      vote,
      toggleFollow,
      updateProfile,
      markNotificationsRead,
      clearNotifications,
      getUser,
      getAuthor,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
