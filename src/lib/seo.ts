import type { Metadata } from "next";
import {
  PROJECT_CATEGORY_LABELS,
  type Project,
} from "@/data/projects";
import { siteConfig } from "@/data/site";

export function absoluteUrl(path = ""): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  ogImage = "/hero/og.jpg",
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  ogImage?: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : ogImage,
          width: 1920,
          height: 1080,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export const pageSeo = {
  home: {
    title: "23 Films | Video Production Studio in North Hollywood, Los Angeles",
    description:
      "23 Films is a full-service video production studio in North Hollywood, LA. Commercial, automotive, music video, real estate, and branded content for Porsche, Lamborghini, ARTBAT, and more.",
    path: "/",
  },
  work: {
    title: "Work | Commercial, Music Video & Narrative",
    description:
      "Portfolio of commercial films, music videos, and narrative work by 23 Films, a North Hollywood production studio serving Los Angeles and beyond.",
    path: "/work",
  },
  services: {
    title: "Services | Commercial, Corporate & Music Video Production",
    description:
      "Commercial, corporate, music video, real estate, podcast, photography, and studio rental at 10710 Burbank Blvd, North Hollywood, CA 91601.",
    path: "/services",
  },
  about: {
    title: "About | 23 Films Video Production Studio",
    description:
      "23 Films is a North Hollywood video production studio. End-to-end commercial, music video, and branded content, from concept and production to final edit, sound, and color.",
    path: "/about",
  },
  contact: {
    title: "Contact | Start a Project",
    description:
      "Contact 23 Films in North Hollywood for commercial video, brand films, and music video production. Email, phone, or WhatsApp. Los Angeles and beyond.",
    path: "/contact",
  },
} as const;

export function projectPageTitle(project: Project): string {
  const meta =
    project.client ?? PROJECT_CATEGORY_LABELS[project.category];
  return `${project.title} | ${meta}`;
}

export function projectSeoDescription(project: Project): string {
  const cleaned = project.description
    .replace(/\s*FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST\.?/gi, "")
    .replace(/\s*OFFICIAL MUSIC VIDEO\s*[.—]?\s*/gi, "Official music video. ")
    .replace(/\s+/g, " ")
    .trim();

  const firstSentence = cleaned.split(/(?<=[.!])\s+/)[0]?.trim() ?? project.title;
  const normalized =
    firstSentence.charAt(0).toUpperCase() +
    firstSentence.slice(1).toLowerCase();
  const body = normalized.endsWith(".") ? normalized : `${normalized}.`;
  const suffix = " Produced by 23 Films in North Hollywood.";
  const result = `${body}${suffix}`;

  return result.length <= 160 ? result : `${result.slice(0, 157)}...`;
}

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;

export function buildSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
        "@id": ORG_ID,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        email: siteConfig.email,
        telephone: siteConfig.phoneLinks[0],
        description: siteConfig.description,
        image: absoluteUrl("/hero/og.jpg"),
        logo: absoluteUrl("/logo.png"),
        sameAs: [
          siteConfig.social.instagram,
          siteConfig.social.telegram,
          siteConfig.social.whatsapp,
          siteConfig.studioRentalUrl,
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.street,
          addressLocality: siteConfig.address.city,
          addressRegion: siteConfig.address.region,
          postalCode: siteConfig.address.postalCode,
          addressCountry: siteConfig.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 34.1719,
          longitude: -118.3186,
        },
        areaServed: {
          "@type": "City",
          name: "Los Angeles",
        },
        priceRange: "$$$",
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function buildVideoJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: project.title,
    description: projectSeoDescription(project),
    thumbnailUrl: absoluteUrl(project.thumbnail),
    embedUrl: `https://player.vimeo.com/video/${project.vimeoId}`,
    contentUrl: `https://vimeo.com/${project.vimeoId}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
}

export function buildBreadcrumbJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: absoluteUrl("/work"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: absoluteUrl(`/work/${project.slug}`),
      },
    ],
  };
}
