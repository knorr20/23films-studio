interface VimeoPlayerProps {
  vimeoId: string;
  title: string;
}

export function VimeoPlayer({ vimeoId, title }: VimeoPlayerProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-bg-elevated">
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
        allowFullScreen
        title={title}
        loading="lazy"
      />
    </div>
  );
}
