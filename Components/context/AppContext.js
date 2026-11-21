import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { DEFAULT_PROFILE, SEED_TWEETS, USERS } from "../data/seed";

const STORAGE_KEY = "twitter-clone:v1";
export const MAX_TWEET_LENGTH = 280;

const initialState = {
  tweets: SEED_TWEETS,
  liked: [],
  retweeted: [],
  following: [],
  profile: DEFAULT_PROFILE,
};

const toggle = (list, value) =>
  list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE":
      return { ...initialState, ...action.payload };
    case "ADD_TWEET":
      return { ...state, tweets: [action.tweet, ...state.tweets] };
    case "DELETE_TWEET":
      return {
        ...state,
        tweets: state.tweets.filter((t) => t.id !== action.id),
        liked: state.liked.filter((id) => id !== action.id),
        retweeted: state.retweeted.filter((id) => id !== action.id),
      };
    case "TOGGLE_LIKE":
      return { ...state, liked: toggle(state.liked, action.id) };
    case "TOGGLE_RETWEET":
      return { ...state, retweeted: toggle(state.retweeted, action.id) };
    case "TOGGLE_FOLLOW":
      return { ...state, following: toggle(state.following, action.handle) };
    case "UPDATE_PROFILE":
      return { ...state, profile: { ...state.profile, ...action.changes } };
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);
  const [query, setQuery] = useState("");

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
    } catch (err) {
      console.error("Could not save data:", err);
    }
  }, [state, hydrated]);

  const addTweet = useCallback(
    (text) => {
      const clean = text.trim();
      if (!clean || clean.length > MAX_TWEET_LENGTH) return false;
      dispatch({
        type: "ADD_TWEET",
        tweet: {
          id: `t-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          author: state.profile.handle,
          text: clean,
          createdAt: Date.now(),
          likes: 0,
          retweets: 0,
        },
      });
      return true;
    },
    [state.profile.handle]
  );

  const deleteTweet = useCallback((id) => dispatch({ type: "DELETE_TWEET", id }), []);
  const toggleLike = useCallback((id) => dispatch({ type: "TOGGLE_LIKE", id }), []);
  const toggleRetweet = useCallback((id) => dispatch({ type: "TOGGLE_RETWEET", id }), []);
  const toggleFollow = useCallback((handle) => dispatch({ type: "TOGGLE_FOLLOW", handle }), []);
  const updateProfile = useCallback(
    (changes) => dispatch({ type: "UPDATE_PROFILE", changes }),
    []
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

  const value = useMemo(
    () => ({
      ...state,
      query,
      setQuery,
      addTweet,
      deleteTweet,
      toggleLike,
      toggleRetweet,
      toggleFollow,
      updateProfile,
      getAuthor,
    }),
    [state, query, addTweet, deleteTweet, toggleLike, toggleRetweet, toggleFollow, updateProfile, getAuthor]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside <AppProvider>");
  return ctx;
}
