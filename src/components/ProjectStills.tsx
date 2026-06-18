import Image from "next/image";

interface ProjectStillsProps {
  images: string[];
  title: string;
  fit?: "cover" | "contain";
}

export function ProjectStills({
  images,
  title,
  fit = "cover",
}: ProjectStillsProps) {
  if (images.length === 0) return null;

  return (
    <div className="mt-16 space-y-2 md:mt-20">
      {images.map((src, index) =>
        fit === "contain" ? (
          <figure key={`${src}-${index}`} className="w-full bg-bg">
            <Image
              src={src}
              alt={`${title} — frame ${index + 1}`}
              width={1920}
              height={1080}
              className="h-auto w-full"
              sizes="(max-width: 1440px) 100vw, 1440px"
              priority={index === 0}
            />
          </figure>
        ) : (
          <figure
            key={`${src}-${index}`}
            className="relative aspect-[2.39/1] w-full overflow-hidden bg-bg"
          >
            <Image
              src={src}
              alt={`${title} — frame ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1440px) 100vw, 1440px"
              priority={index === 0}
            />
          </figure>
        ),
      )}
    </div>
  );
}
