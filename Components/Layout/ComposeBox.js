import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/compose.module.css";
import { MAX_TWEET_LENGTH, useApp } from "../context/AppContext";
import { resizeImage } from "../lib/image";
import { CloseIcon, ImageIcon, PollIcon } from "./Icons";

const HOUR = 60 * 60 * 1000;
const POLL_DURATIONS = [
  { label: "1 hour", ms: HOUR },
  { label: "6 hours", ms: 6 * HOUR },
  { label: "1 day", ms: 24 * HOUR },
  { label: "3 days", ms: 72 * HOUR },
  { label: "7 days", ms: 168 * HOUR },
];
const MAX_POLL_OPTIONS = 4;
const MAX_OPTION_LENGTH = 25;

const newPoll = () => ({ options: ["", ""], durationMs: 24 * HOUR });

// Used for new tweets on the home page and for replies on a tweet's page.
const ComposeBox = ({
  replyTo = null,
  placeholder = "What is happening?!",
  submitLabel = "Post",
  inputId = "compose-input",
  autoFocus = false,
}) => {
  const { profile, addTweet } = useApp();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [poll, setPoll] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const remaining = MAX_TWEET_LENGTH - text.length;
  const filledOptions = poll ? poll.options.filter((o) => o.trim()).length : 0;
  const hasText = text.trim().length > 0;
  const canPost =
    !busy && remaining >= 0 && (hasText || Boolean(image)) && (!poll || (hasText && filledOptions >= 2));

  const reset = () => {
    setText("");
    setImage(null);
    setPoll(null);
    setError("");
  };

  const submit = () => {
    if (!canPost) return;
    const ok = addTweet({
      text,
      image,
      poll: poll ? { options: poll.options, durationMs: poll.durationMs } : null,
      replyTo,
    });
    if (ok) reset();
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") submit();
  };

  const pickImage = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets you pick the same file again later
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      setImage(await resizeImage(file, { maxWidth: 1280, maxHeight: 1280, quality: 0.82 }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const setOption = (index, value) =>
    setPoll((p) => ({ ...p, options: p.options.map((o, i) => (i === index ? value : o)) }));

  return (
    <div className={styles.compose}>
      <img src={profile.avatar} alt={profile.name} className={styles.avatar} />
      <div className={styles.right}>
        <textarea
          id={inputId}
          ref={inputRef}
          className={styles.input}
          placeholder={placeholder}
          value={text}
          rows={2}
          dir="auto"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {image && (
          <div className={styles.preview}>
            <img src={image} alt="Selected attachment" />
            <button className={styles.removeButton} onClick={() => setImage(null)} aria-label="Remove image">
              <CloseIcon />
            </button>
          </div>
        )}

        {poll && (
          <div className={styles.poll}>
            {poll.options.map((option, i) => (
              <div key={i} className={styles.pollRow}>
                <input
                  className={styles.pollInput}
                  value={option}
                  maxLength={MAX_OPTION_LENGTH}
                  dir="auto"
                  placeholder={`Choice ${i + 1}${i < 2 ? "" : " (optional)"}`}
                  aria-label={`Poll choice ${i + 1}`}
                  onChange={(e) => setOption(i, e.target.value)}
                />
                {i >= 2 && (
                  <button
                    className={styles.pollRemove}
                    aria-label={`Remove choice ${i + 1}`}
                    onClick={() => setPoll((p) => ({ ...p, options: p.options.filter((_, j) => j !== i) }))}
                  >
                    <CloseIcon />
                  </button>
                )}
              </div>
            ))}
            <div className={styles.pollFooter}>
              {poll.options.length < MAX_POLL_OPTIONS && (
                <button className={styles.textButton} onClick={() => setPoll((p) => ({ ...p, options: [...p.options, ""] }))}>
                  Add a choice
                </button>
              )}
              <label className={styles.duration}>
                Poll length
                <select
                  value={poll.durationMs}
                  onChange={(e) => setPoll((p) => ({ ...p, durationMs: Number(e.target.value) }))}
                >
                  {POLL_DURATIONS.map((d) => (
                    <option key={d.ms} value={d.ms}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </label>
              <button className={`${styles.textButton} ${styles.danger}`} onClick={() => setPoll(null)}>
                Remove poll
              </button>
            </div>
            {!hasText && <p className={styles.hint}>Write your question above to post a poll.</p>}
          </div>
        )}

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <div className={styles.bottom}>
          <div className={styles.tools}>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickImage} />
            <button
              className={styles.toolButton}
              onClick={() => fileRef.current?.click()}
              disabled={Boolean(poll) || busy}
              aria-label="Add a photo"
              title="Add a photo"
            >
              <ImageIcon />
            </button>
            {!replyTo && (
              <button
                className={styles.toolButton}
                onClick={() => setPoll(newPoll())}
                disabled={Boolean(poll) || Boolean(image)}
                aria-label="Add a poll"
                title="Add a poll"
              >
                <PollIcon />
              </button>
            )}
          </div>

          <span className={`${styles.counter} ${remaining < 0 ? styles.over : ""}`}>
            {text.length > 0 ? remaining : ""}
          </span>
          <button className={styles.postButton} onClick={submit} disabled={!canPost}>
            {busy ? "Loading…" : submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeBox;
