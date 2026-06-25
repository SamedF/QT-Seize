import type { ImageFile } from "../../types/ImageFile";
import ImageCard from "./ImageCard";

interface Props {
  images: ImageFile[];
  onRemove: (id: string) => void;
}

export default function ImageGrid({
  images,
  onRemove,
}: Props) {
  return (
    <div className="grid gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {images.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}