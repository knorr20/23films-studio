import type { NextConfig } from "next";
import { projects } from "./src/data/projects";

const legacySlugRedirects: Record<string, string> = {
  "23-production-showreel-2023": "/work",
  "smoke-vibe": "/work",
  "ruffian-who-am-i": "/work/who-i-am",
  elevator: "/work",
  "gareth-west": "/work",
  "korya4ka-koks": "/work",
  sam: "/work/sam-asghari-forge",
  "porsche-gt3-2": "/work/porsche-gt3",
  "muscle-intelligence-camp-in-spain-2024": "/work/muscle-intelligence",
};

const projectRedirects = projects.flatMap((project) => [
  {
    source: `/${project.slug}`,
    destination: `/work/${project.slug}`,
    permanent: true,
  },
  {
    source: `/${project.slug}/`,
    destination: `/work/${project.slug}`,
    permanent: true,
  },
]);

const legacyRedirects = Object.entries(legacySlugRedirects).flatMap(
  ([slug, destination]) => [
    { source: `/${slug}`, destination, permanent: true },
    { source: `/${slug}/`, destination, permanent: true },
  ],
);

const wordpressRedirects = [
  { source: "/wp-admin/:path*", destination: "/", permanent: true },
  { source: "/wp-login.php", destination: "/", permanent: true },
  { source: "/wp-json/:path*", destination: "/", permanent: true },
  { source: "/feed", destination: "/", permanent: true },
  { source: "/feed/", destination: "/", permanent: true },
  { source: "/feed.xml", destination: "/", permanent: true },
  { source: "/atom.xml", destination: "/", permanent: true },
  { source: "/comments/feed/:path*", destination: "/", permanent: true },
  { source: "/category/:path*", destination: "/work", permanent: true },
  { source: "/bts", destination: "/work", permanent: true },
  { source: "/bts/:path*", destination: "/work", permanent: true },
  { source: "/photo", destination: "/work", permanent: true },
  { source: "/photo/:path*", destination: "/work", permanent: true },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [...wordpressRedirects, ...legacyRedirects, ...projectRedirects];
  },
};

export default nextConfig;
