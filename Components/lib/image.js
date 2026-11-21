// Reads an image picked from the device and shrinks it, so it fits in
// localStorage (which only has about 5 MB) and loads fast.
//
//   cover: true  -> crop to exactly maxWidth x maxHeight (avatars, headers)
//   cover: false -> keep the shape, only shrink (tweet photos)

const MAX_INPUT_BYTES = 15 * 1024 * 1024;

export function resizeImage(file, { maxWidth = 1280, maxHeight = 1280, cover = false, quality = 0.82 } = {}) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith("image/")) {
      reject(new Error("Please choose an image file."));
      return;
    }
    if (file.size > MAX_INPUT_BYTES) {
      reject(new Error("That image is too large. Choose one under 15 MB."));
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      try {
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;
        let cw;
        let ch;
        let scale;

        if (cover) {
          cw = maxWidth;
          ch = maxHeight;
          scale = Math.max(cw / iw, ch / ih);
        } else {
          scale = Math.min(1, maxWidth / iw, maxHeight / ih);
          cw = Math.max(1, Math.round(iw * scale));
          ch = Math.max(1, Math.round(ih * scale));
        }

        const canvas = document.createElement("canvas");
        canvas.width = cw;
        canvas.height = ch;
        const ctx = canvas.getContext("2d");
        // JPEG has no transparency, so paint white first.
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, cw, ch);
        const dw = iw * scale;
        const dh = ih * scale;
        ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } catch (err) {
        reject(new Error("Could not process that image."));
      } finally {
        URL.revokeObjectURL(url);
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image. Try a JPG, PNG or WebP file."));
    };

    img.src = url;
  });
}
