import { useState } from "react";
import type { ImageFile } from "../types/ImageFile";
import { loadImage } from "../utils/LoadImage";

export function useImages() {
  const [images, setImages] = useState<ImageFile[]>([]);

  async function addFiles(files: File[]) {
    const loadedImages = await Promise.all(
      files.map((file) => loadImage(file))
    );

    setImages((prevImages) => [...prevImages, ...loadedImages]);
  }

  function removeImage(id: string) {
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    );
  }

  return {
    images,
    addFiles,
    removeImage,
  };
}