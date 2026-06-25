import type { ImageFile } from "../types/ImageFile";

export async function loadImage(file: File): Promise<ImageFile> {
  const preview = URL.createObjectURL(file);

  const img = new Image();
  img.src = preview;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
  });

  return {
    id: crypto.randomUUID(),
    file,
    preview,
    width: img.naturalWidth,
    height: img.naturalHeight,
    size: file.size,
    type: file.type,
  };
}