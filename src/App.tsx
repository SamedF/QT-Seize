import { useState } from "react";
import { useResize } from "./hooks/useResize";
import UploadZone from "./components/upload/UploadZone";
import ImageGrid from "./components/preview/ImageGrid";
import SettingsPanel from "./components/settings/SettingsPanel";

import { useImages } from "./hooks/useImages";
import type { ResizeSettings } from "./types/ResizeSettings";

export default function App() {

  const { images, addFiles, removeImage } = useImages();
  const { resize, loading } = useResize();
  const [settings, setSettings] = useState<ResizeSettings>({
    width: 1920,
    height: 1080,
    format: "jpeg",
    quality: 100,
    aiUpscale: true,
    sharpen: true,
    preserveAspect: true
  });
  async function handleResize() {
    if (images.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    try {
      for (const image of images) {
        const blob = await resize(image.file, {
          width: settings.width,
          height: settings.height,
          format: settings.format,
          quality: settings.quality,
          sharpen: settings.sharpen,
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;

        const extension =
          settings.format === "jpeg" ? "jpg" : settings.format;

        const fileName = image.file.name.replace(/\.[^/.]+$/, "");

        a.download = `${fileName}.${extension}`;

        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
      alert(String(err));
    }
  }
  return (

    <main className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-6xl font-black text-center">

          QT-Seize

        </h1>

        <p className="text-center text-muted mt-3">

          Professional AI Image Resizer

        </p>

        <div className="grid lg:grid-cols-[1fr_340px] gap-10 mt-14">

          <div>

            <UploadZone onFiles={addFiles} />

            <ImageGrid
              images={images}
              onRemove={removeImage}
            />

          </div>

          <SettingsPanel
            settings={settings}
            setSettings={setSettings}
            onResize={handleResize}
            loading={loading}
          />

        </div>

      </div>

    </main>

  );

}