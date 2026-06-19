"use client";

import { ChevronDown } from "lucide-react";
import { HERO_VIDEO_SRC } from "@/data/projects";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-bg">
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_38%] md:object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero/poster.jpg"
      >
        <source src={HERO_VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Bottom scrim — stronger on mobile so type sits on dark, not on the logo */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-bg from-25% via-bg/55 via-45% to-transparent md:from-15% md:via-bg/30"
        aria-hidden
      />

      <div className="relative flex h-full flex-col justify-end">
        <div className="max-content w-full px-6 pb-[4.75rem] md:px-12 md:pb-24">
          <div className="animate-[fadeIn_400ms_ease-out]">
            <h1 className="font-display text-[2.125rem] leading-[1.05] text-display text-text sm:text-4xl md:text-7xl lg:text-8xl">
              {siteConfig.name}
            </h1>
            <p className="text-caption mt-3 max-w-xs md:mt-4 md:max-w-none">
              {siteConfig.tagline}
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-10 -translate-x-1/2 md:bottom-8"
          aria-hidden
        >
          <ChevronDown
            className="scroll-hint text-text/50"
            size={22}
            strokeWidth={1.25}
          />
        </div>
      </div>
    </section>
  );
}
