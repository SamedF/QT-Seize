import type { ImageFile } from "../../types/ImageFile";
import { Trash2, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  image: ImageFile;
  onRemove: (id: string) => void;
}

export default function ImageCard({ image, onRemove }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: .95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="glass rounded-2xl overflow-hidden"
    >
      <div className="aspect-video bg-black overflow-hidden">
        <img
          src={image.preview}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">

        <div className="flex justify-between items-center">

          <h3 className="font-bold truncate">
            {image.file.name}
          </h3>

          <button
            onClick={() => onRemove(image.id)}
            className="hover:text-red-500 transition"
          >
            <Trash2 size={18}/>
          </button>

        </div>

        <div className="mt-4 space-y-2 text-sm text-muted">

          <div className="flex justify-between">
            <span>Resolution</span>
            <span>
              {image.width} × {image.height}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Type</span>
            <span>
              {image.type.replace("image/","").toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Size</span>
            <span>
              {(image.size/1024/1024).toFixed(2)} MB
            </span>
          </div>

        </div>

      </div>

    </motion.div>
  );
}