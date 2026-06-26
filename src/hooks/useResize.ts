import { useState } from "react";
import { resizeImage } from "../services/image.service";

export function useResize() {
  const [loading, setLoading] = useState(false);

  async function resize(
    file: File,
    settings: {
      width: number;
      height: number;
      format: "jpeg" | "png" | "webp" | "avif";
      quality: number;
      sharpen: boolean;
    }
  ) {
    setLoading(true);

    try {
      return await resizeImage({
        file,
        ...settings,
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    resize,
    loading,
  };
}