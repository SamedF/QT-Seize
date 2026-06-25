import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  onFiles: (files: File[]) => void;
};

export default function UploadZone({ onFiles }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFiles(acceptedFiles);
    },
    [onFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />

      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`glass rounded-2xl border-2 border-dashed p-20 transition-all ${
          isDragActive ? "border-white" : "border-border"
        }`}
      >
        <div className="flex flex-col items-center">
          <UploadCloud size={70} />

          <h2 className="text-3xl font-bold mt-6">
            {isDragActive ? "Drop them!" : "Drop your images here"}
          </h2>

          <p className="text-muted mt-4">
            Click or Drag & Drop
          </p>
        </div>
      </motion.div>
    </div>
  );
}