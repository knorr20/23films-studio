"use client";

import Image from "next/image";
import { SHOWREEL_VIMEO_ID } from "@/data/projects";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-bg">
      {/* Change SHOWREEL_VIMEO_ID in src/data/projects.ts to swap hero video */}
      <iframe
        src={`https://player.vimeo.com/video/${SHOWREEL_VIMEO_ID}?background=1&autoplay=1&loop=1&muted=1&controls=0&title=0&byline=0&portrait=0&dnt=1`}
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.02] object-cover"
        allow="autoplay; fullscreen; picture-in-picture"
        title="23 Production showreel"
        referrerPolicy="strict-origin-when-cross-origin"
      />

      <Image
        src="/hero/poster.webp"
        alt=""
        fill
        priority
        className="-z-10 object-cover"
        aria-hidden
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-bg/10"
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
