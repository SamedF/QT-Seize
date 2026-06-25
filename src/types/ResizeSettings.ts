export type OutputFormat = "jpeg" | "png" | "webp" | "avif";

export interface ResizeSettings {
  width: number;
  height: number;
  format: OutputFormat;
  quality: number;
  aiUpscale: boolean;
  sharpen: boolean;
  preserveAspect: boolean;
}