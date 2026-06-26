import type { ResizeSettings } from "../../types/ResizeSettings";

interface Props {
  settings: ResizeSettings;
  setSettings: React.Dispatch<React.SetStateAction<ResizeSettings>>;
  onResize: () => void;
  loading?: boolean;
}

export default function SettingsPanel({
  settings,
  setSettings,
  onResize,
  loading,
}: Props) {
  return (
    <div className="glass rounded-2xl p-6 space-y-6 h-fit">

      <h2 className="text-2xl font-bold">
        Resize Settings
      </h2>

      <div>
        <label className="text-sm text-muted">Width</label>

        <input
          type="number"
          value={settings.width}
          onChange={(e) =>
            setSettings(prev => ({
              ...prev,
              width: Number(e.target.value)
            }))
          }
          className="mt-2 w-full bg-black rounded-lg p-3"
        />
      </div>

      <div>
        <label className="text-sm text-muted">Height</label>

        <input
          type="number"
          value={settings.height}
          onChange={(e) =>
            setSettings(prev => ({
              ...prev,
              height: Number(e.target.value)
            }))
          }
          className="mt-2 w-full bg-black rounded-lg p-3"
        />
      </div>

      <div>

        <label className="text-sm text-muted">

          Format

        </label>

        <select
          value={settings.format}
          onChange={(e) =>
            setSettings(prev => ({
              ...prev,
              format: e.target.value as any
            }))
          }
          className="mt-2 w-full bg-black rounded-lg p-3"
        >
          <option>jpeg</option>
          <option>png</option>
          <option>webp</option>
          <option>avif</option>
        </select>

      </div>

      <div>

        <label className="text-sm text-muted">

          Quality

        </label>

        <input
          type="range"
          min={50}
          max={100}
          value={settings.quality}
          onChange={(e) =>
            setSettings(prev => ({
              ...prev,
              quality: Number(e.target.value)
            }))
          }
          className="w-full mt-3"
        />

        <p className="text-center mt-2">

          {settings.quality}%

        </p>

      </div>

      <label className="flex justify-between">

        AI Upscale

        <input
          type="checkbox"
          checked={settings.aiUpscale}
          onChange={(e) =>
            setSettings(prev => ({
              ...prev,
              aiUpscale: e.target.checked
            }))
          }
        />

      </label>

      <label className="flex justify-between">

        Smart Sharpen

        <input
          type="checkbox"
          checked={settings.sharpen}
          onChange={(e) =>
            setSettings(prev => ({
              ...prev,
              sharpen: e.target.checked
            }))
          }
        />

      </label>

      <button
        onClick={onResize}
        disabled={loading}
        className="w-full bg-white text-black rounded-xl py-4 font-bold disabled:opacity-50"
      >
        {loading ? "Processing..." : "Resize Images"}
      </button>

    </div>
  );
}