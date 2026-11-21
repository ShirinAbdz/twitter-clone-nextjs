import React, { useEffect, useState } from "react";
import styles from "../styles/modal.module.css";
import { useApp } from "../context/AppContext";

const EditProfileModal = ({ onClose }) => {
  const { profile, updateProfile } = useApp();
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [location, setLocation] = useState(profile.location);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const save = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    updateProfile({ name: name.trim(), bio: bio.trim(), location: location.trim() });
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
          <button type="submit" className={styles.save} disabled={!name.trim()}>
            Save
          </button>
        </div>

        <label>
          Name
          <input value={name} maxLength={50} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Bio
          <textarea value={bio} maxLength={160} rows={3} onChange={(e) => setBio(e.target.value)} />
        </label>
        <label>
          Location
          <input value={location} maxLength={30} onChange={(e) => setLocation(e.target.value)} />
        </label>
      </form>
    </div>
  );
};

export default EditProfileModal;
