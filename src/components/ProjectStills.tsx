import Image from "next/image";

interface ProjectStillsProps {
  images: string[];
  title: string;
}

export function ProjectStills({ images, title }: ProjectStillsProps) {
  if (images.length === 0) return null;

  const [hero, ...rest] = images;

  return (
    <div className="mt-16 space-y-2 md:mt-20">
      <figure className="relative aspect-[2.39/1] w-full overflow-hidden bg-bg-elevated">
        <Image
          src={hero}
          alt={`${title} — frame 1`}
          fill
          className="object-cover"
          sizes="(max-width: 1440px) 100vw, 1440px"
          priority
        />
      </figure>

      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {rest.map((src, index) => (
            <figure
              key={src}
              className={`relative aspect-[2.39/1] overflow-hidden bg-bg-elevated ${
                rest.length % 2 === 1 && index === rest.length - 1
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              <Image
                src={src}
                alt={`${title} — frame ${index + 2}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
