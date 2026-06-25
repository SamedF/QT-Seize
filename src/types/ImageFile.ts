export interface ImageFile {
  id: string;

  file: File;

  preview: string;

  width: number;

  height: number;

  size: number;

  type: string;

  outputWidth?: number;

  outputHeight?: number;

  estimatedSize?: number;
}