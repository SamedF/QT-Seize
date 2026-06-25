import { useState } from "react";

import UploadZone from "./components/upload/UploadZone";
import ImageGrid from "./components/preview/ImageGrid";
import SettingsPanel from "./components/settings/SettingsPanel";

import { useImages } from "./hooks/useImages";
import type { ResizeSettings } from "./types/ResizeSettings";

export default function App() {

  const { images, addFiles, removeImage } = useImages();

  const [settings, setSettings] = useState<ResizeSettings>({
    width:1920,
    height:1080,
    format:"jpeg",
    quality:100,
    aiUpscale:true,
    sharpen:true,
    preserveAspect:true
  });

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

            <UploadZone onFiles={addFiles}/>

            <ImageGrid
              images={images}
              onRemove={removeImage}
            />

          </div>

          <SettingsPanel
            settings={settings}
            setSettings={setSettings}
          />

        </div>

      </div>

    </main>

  );

}