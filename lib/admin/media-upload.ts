/**
 * Client-side media processing and optimization helpers for Admin Gallery
 * - Auto-converts uploaded images to high-efficiency WebP using HTML5 Canvas
 * - Auto-extracts poster/thumbnail frames from uploaded video files
 * - Detects YouTube video URLs and auto-extracts high-res thumbnail & embed URLs
 */

export async function optimizeImageToWebP(
  file: File,
  maxDimension = 1920,
  quality = 0.85
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/webp", quality));
      };
      img.onerror = () => reject(new Error("Failed to load image for optimization"));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

export async function generateVideoThumbnail(
  file: File,
  seekTime = 1.0
): Promise<string> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);
    video.src = url;
    video.muted = true;
    video.playsInline = true;

    // Timeout safety
    const timeout = setTimeout(() => {
      URL.revokeObjectURL(url);
      resolve("");
    }, 5000);

    video.onloadeddata = () => {
      video.currentTime = seekTime;
    };

    video.onseeked = () => {
      clearTimeout(timeout);
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL("image/webp", 0.8);
          URL.revokeObjectURL(url);
          resolve(dataUrl);
          return;
        }
      } catch (err) {
        console.warn("Could not capture video canvas frame", err);
      }
      URL.revokeObjectURL(url);
      resolve("");
    };

    video.onerror = () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(url);
      resolve("");
    };
  });
}

export function parseYouTubeVideo(url: string): {
  isYouTube: boolean;
  videoId: string;
  embedUrl: string;
  thumbnailUrl: string;
} {
  if (!url) return { isYouTube: false, videoId: "", embedUrl: "", thumbnailUrl: "" };
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.trim().match(regExp);
  if (match && match[2] && match[2].length === 11) {
    const videoId = match[2];
    return {
      isYouTube: true,
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    };
  }
  return { isYouTube: false, videoId: "", embedUrl: url, thumbnailUrl: "" };
}

/**
 * Ensures any YouTube URL or embed URL has autoplay=1, mute=1, and playsinline=1
 * so modern browsers do not block autoplay due to audio/interaction policies.
 */
export function ensureYouTubeAutoplayUrl(url: string): string {
  if (!url) return "";
  const parsed = parseYouTubeVideo(url);
  if (parsed.isYouTube && parsed.videoId) {
    return `https://www.youtube-nocookie.com/embed/${parsed.videoId}?autoplay=1&mute=1&playsinline=1&rel=0`;
  }
  if (url.includes("embed/")) {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.searchParams.set("autoplay", "1");
      parsedUrl.searchParams.set("mute", "1");
      parsedUrl.searchParams.set("playsinline", "1");
      if (!parsedUrl.searchParams.has("rel")) {
        parsedUrl.searchParams.set("rel", "0");
      }
      return parsedUrl.toString();
    } catch {
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}autoplay=1&mute=1&playsinline=1`;
    }
  }
  return url;
}

