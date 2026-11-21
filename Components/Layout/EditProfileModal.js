import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/modal.module.css";
import { useApp } from "../context/AppContext";
import { resizeImage } from "../lib/image";
import { gradientFor } from "../lib/format";
import { CameraIcon, CloseIcon } from "./Icons";

const EditProfileModal = ({ onClose }) => {
  const { profile, updateProfile } = useApp();
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState(profile.location);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [header, setHeader] = useState(profile.header);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const avatarInput = useRef(null);
  const headerInput = useRef(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Reads the chosen file, shrinks it, then hands the result to `apply`.
  const pick = (options, apply) => async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      apply(await resizeImage(file, options));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const save = (e) => {
    e.preventDefault();
    if (!name.trim() || busy) return;
    updateProfile({
      name: name.trim(),
      bio: bio.trim(),
      location: location.trim(),
      avatar,
      header,
    });
    onClose();
  };

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <form
        className={styles.modal}
        onMouseDown={(e) => e.stopPropagation()}
        onSubmit={save}
        role="dialog"
        aria-modal="true"
        aria-label="Edit profile"
      >
        <div className={styles.top}>
          <h3>Edit profile</h3>
          <button type="button" className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.save} disabled={!name.trim() || busy}>
            Save
          </button>
        </div>

        <div className={styles.photos}>
          <div className={styles.headerPick} style={header ? undefined : { background: gradientFor(profile.handle) }}>
            {header && <img src={header} alt="Header preview" />}
            <div className={styles.headerButtons}>
              <button
                type="button"
                className={styles.roundButton}
                onClick={() => headerInput.current?.click()}
                aria-label="Change header photo"
                title="Change header photo"
              >
                <CameraIcon />
              </button>
              {header && (
                <button
                  type="button"
                  className={styles.roundButton}
                  onClick={() => setHeader("")}
                  aria-label="Remove header photo"
                  title="Remove header photo"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            <input
              ref={headerInput}
              type="file"
              accept="image/*"
              hidden
              onChange={pick({ maxWidth: 1500, maxHeight: 500, cover: true, quality: 0.85 }, setHeader)}
            />
          </div>

          <div className={styles.avatarPick}>
            <img src={avatar || "/profile.svg"} alt="Profile photo preview" />
            <button
              type="button"
              className={`${styles.roundButton} ${styles.avatarButton}`}
              onClick={() => avatarInput.current?.click()}
              aria-label="Change profile photo"
              title="Change profile photo"
            >
              <CameraIcon />
            </button>
            <input
              ref={avatarInput}
              type="file"
              accept="image/*"
              hidden
              onChange={pick({ maxWidth: 400, maxHeight: 400, cover: true, quality: 0.85 }, setAvatar)}
            />
          </div>
        </div>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <label>
          Name
          <input value={name} maxLength={50} dir="auto" onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Bio
          <textarea value={bio} maxLength={160} rows={3} dir="auto" onChange={(e) => setBio(e.target.value)} />
        </label>
        <label>
          Location
          <input value={location} maxLength={30} dir="auto" onChange={(e) => setLocation(e.target.value)} />
        </label>
      </form>
    </div>
  );
};

export default EditProfileModal;
