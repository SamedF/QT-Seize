export interface ResizeRequest {
  file: File;
  width: number;
  height: number;
  format: "jpeg" | "png" | "webp" | "avif";
  quality: number;
  sharpen: boolean;
}

export async function resizeImage(
  data: ResizeRequest
): Promise<Blob> {
  const formData = new FormData();

  formData.append("image", data.file);
  formData.append("width", data.width.toString());
  formData.append("height", data.height.toString());
  formData.append("format", data.format);
  formData.append("quality", data.quality.toString());
  formData.append("sharpen", String(data.sharpen));

  const response = await fetch(import.meta.env.VITE_API_URL + "/resize", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Resize failed");
  }

  return await response.blob();
}