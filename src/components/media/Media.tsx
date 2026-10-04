import { cn } from "@/lib/utils";

export type MediaImage = {
  src: string;
  srcSet?: string;
  sizes?: string;
  width: number;
  height: number;
  alt: string;
};

type MediaProps = {
  ratio: string;
  image?: MediaImage;
  priority?: boolean;
  backdrop?: "surface" | "black";
  className?: string;
};

export function Media({
  ratio,
  image,
  priority = false,
  backdrop = "surface",
  className,
}: MediaProps) {
  return (
    <div
      data-tone={backdrop === "black" ? "black" : undefined}
      aria-hidden={image ? undefined : true}
      className={cn(
        "relative overflow-hidden rounded-lg border border-border",
        backdrop === "surface" && "bg-muted",
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {image && (
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes={image.sizes}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="size-full object-cover"
        />
      )}
    </div>
  );
}
