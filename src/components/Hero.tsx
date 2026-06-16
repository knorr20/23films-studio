"use client";

import { HERO_VIDEO_URL } from "@/data/projects";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://23films.studio/wp-content/themes/just1page/bg-poster.webp"
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent"
        aria-hidden
      />

      <div className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-20">
        <div className="max-content animate-[fadeIn_400ms_ease-out]">
          <h1 className="font-display text-4xl text-display text-text md:text-7xl lg:text-8xl">
            23 Production
          </h1>
          <p className="text-caption mt-4">{siteConfig.tagline}</p>
        </div>

        <div className="max-content mt-12 flex items-center gap-3">
          <div className="h-10 w-px bg-text-muted" aria-hidden />
          <span className="text-caption">Scroll</span>
        </div>
      </div>
    </section>
  );
}
