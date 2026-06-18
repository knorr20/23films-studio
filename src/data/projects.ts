export type ProjectCategory = "commercial" | "music-video" | "narrative";

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  commercial: "Commercial",
  "music-video": "Music Video",
  narrative: "Narrative",
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "commercial",
  "music-video",
  "narrative",
];

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  client?: string;
  cardMeta?: string;
  vimeoId: string;
  thumbnail: string;
  previewVideo?: string;
  featured: boolean;
  description: string;
  stills?: string[];
  stillsFit?: "cover" | "contain";
}

export const SHOWREEL_VIMEO_ID = "982264133";

/** Local fullscreen hero background — replace file at public/hero/hero.mp4 */
export const HERO_VIDEO_SRC = "/hero/hero.mp4";

export const projects: Project[] = [
  {
    slug: "porsche-gt3",
    title: "Porsche GT3",
    category: "commercial",
    client: "Porsche",
    vimeoId: "1126302394",
    thumbnail: "/work/porsche-gt3/still-01.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/Porsche.mp4",
    featured: true,
    description:
      "COMMERCIAL FOR PORSCHE GT3 — PACE, PRECISION, AND PRESENCE IN MOTION.",
    stills: [
      "/work/porsche-gt3/still-01.png",
      "/work/porsche-gt3/still-04.png",
      "/work/porsche-gt3/still-03.png",
      "/work/porsche-gt3/still-02.png",
      "/work/porsche-gt3/still-05.png",
    ],
  },
  {
    slug: "lamborghini-aventador",
    title: "Lamborghini Aventador",
    subtitle: "Lamborghini Aventador by RR Auto-Group",
    category: "commercial",
    client: "RR Auto-Group",
    vimeoId: "1202006049",
    thumbnail:
      "/work/lamborghini-aventador.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/IMG_5279-1.mp4",
    featured: true,
    description:
      "Luxury automotive film blending dramatic lighting with sculptural vehicle cinematography.",
  },
  {
    slug: "estate-in-palma-de-mallorca-spain",
    title: "Estate in Palma de Mallorca, Spain",
    subtitle: "$45,000,000 Estate by Nuvola Capitanio",
    category: "commercial",
    client: "Nuvola Capitanio",
    vimeoId: "1202300697",
    thumbnail:
      "/work/estate-in-palma-de-mallorca-spain.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/IMG_5282.mp4",
    featured: true,
    description:
      "Luxury real estate film showcasing architecture, landscape, and lifestyle across Mallorca.",
  },
  {
    slug: "new-video-for-nuvola-capitanio",
    title: "London's Most Unique Penthouse",
    subtitle: "New video for Nuvola Capitanio",
    category: "commercial",
    client: "Nuvola Capitanio",
    vimeoId: "1202300317",
    thumbnail:
      "/work/new-video-for-nuvola-capitanio.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/2024-07-14-06.33.35.mp4",
    featured: true,
    description:
      "International real estate storytelling for one of London's most distinctive penthouse properties.",
  },
  {
    slug: "ben-pakulski",
    title: "Ben Pakulski",
    category: "commercial",
    vimeoId: "1202001870",
    thumbnail:
      "/work/ben-pakulski.webp",
    featured: true,
    description:
      "Fitness and personal brand content with dynamic pacing and strong visual identity.",
  },
  {
    slug: "morten-artbat-hollow",
    title: "MORTEN & ARTBAT ft. Bonn — \"Hollow\"",
    category: "music-video",
    client: "ARTBAT",
    vimeoId: "1126298417",
    thumbnail: "/work/morten-artbat-hollow/hollowthumb1.png",
    featured: false,
    description:
      "OFFICIAL MUSIC VIDEO — FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/morten-artbat-hollow/hollowthumb1.png",
      "/work/morten-artbat-hollow/hollowthumb2.png",
      "/work/morten-artbat-hollow/hollowthumb3.png",
      "/work/morten-artbat-hollow/hollowthumb4.png",
      "/work/morten-artbat-hollow/hollowthumb5.png",
      "/work/morten-artbat-hollow/hollowthumb6.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "artbat-braev-humans",
    title: "ARTBAT ft. Braev — \"Humans\"",
    category: "music-video",
    client: "ARTBAT",
    vimeoId: "1126297949",
    thumbnail: "/work/artbat-braev-humans.jpg",
    featured: false,
    description:
      "OFFICIAL MUSIC VIDEO — FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
  },
  {
    slug: "morten-artbat-culture",
    title: "MORTEN & ARTBAT — \"Culture\"",
    category: "music-video",
    client: "ARTBAT",
    vimeoId: "1126295526",
    thumbnail: "/work/morten-artbat-culture.jpg",
    featured: false,
    description:
      "OFFICIAL MUSIC VIDEO — FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
  },
  {
    slug: "lucent-out-to-sea",
    title: "Out to Sea",
    category: "commercial",
    client: "Lucent",
    vimeoId: "1202001174",
    thumbnail: "/work/lucent-out-to-sea.jpg",
    featured: false,
    description:
      "BRAND CAMPAIGN — FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
  },
  {
    slug: "growerev",
    title: "GroweRev",
    category: "commercial",
    vimeoId: "1202001868",
    thumbnail:
      "/work/growerev.webp",
    featured: false,
    description: "Brand film with editorial pacing and product-focused visuals.",
  },
  {
    slug: "soda-please",
    title: "Soda Please",
    subtitle: "Original Soda Please · Teaser",
    cardMeta: "Original",
    category: "narrative",
    vimeoId: "1126304129",
    thumbnail: "/work/soda-please-poster.jpg",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/soda-4sec.mp4",
    featured: false,
    description:
      "SHORT FILM TEASER — FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/soda-please/sodaplease1.png",
      "/work/soda-please/sodaplease2.png",
      "/work/soda-please/sodaplease3.png",
      "/work/soda-please/sodaplease4.png",
      "/work/soda-please/sodaplease5.png",
      "/work/soda-please/sodaplease6.png",
      "/work/soda-please/sodaplease7.png",
      "/work/soda-please/sodaplease8.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "muscle-intelligence",
    title: "Muscle Intelligence",
    category: "commercial",
    client: "Ben Pakulski",
    vimeoId: "1202001871",
    thumbnail:
      "/work/muscle-intelligence.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/IMG_8213.mov",
    featured: false,
    description:
      "FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/muscle-intelligence/still01.png",
      "/work/muscle-intelligence/still02.png",
      "/work/muscle-intelligence/still03.png",
      "/work/muscle-intelligence/still04.png",
      "/work/muscle-intelligence/still05.png",
      "/work/muscle-intelligence/still06.png",
      "/work/muscle-intelligence/still07.png",
      "/work/muscle-intelligence/still08.png",
      "/work/muscle-intelligence/still09.png",
      "/work/muscle-intelligence/still10.png",
      "/work/muscle-intelligence/still11.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "new-video-for-upholstery-inc",
    title: "New Video For Upholstery Inc.",
    subtitle: "Fizzy Obsession: A Bitter Twist",
    category: "commercial",
    client: "Upholstery Inc.",
    vimeoId: "1126299379",
    thumbnail:
      "/work/new-video-for-upholstery-inc.jpg",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/car-4sec-—-youtube.mp4",
    featured: false,
    description:
      "Commercial production for Upholstery Inc. with cinematic automotive detailing.",
  },
  {
    slug: "aston-martin-vantage-v12",
    title: "Aston Martin Vantage V12",
    category: "commercial",
    client: "Aston Martin",
    vimeoId: "1126296330",
    thumbnail:
      "/work/aston-martin-vantage-v12.webp",
    featured: false,
    description:
      "Automotive film emphasizing lines, power, and luxury craftsmanship.",
  },
  {
    slug: "soda-please-ii-teaser",
    title: "Soda Please II",
    subtitle: "Original Soda Please II · Teaser",
    cardMeta: "Original",
    category: "narrative",
    vimeoId: "1202300493",
    thumbnail:
      "/work/soda-please-ii-teaser.webp",
    featured: false,
    description:
      "SHORT FILM TEASER — FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
  },
  {
    slug: "mandi-holding",
    title: "Mandi Holding",
    category: "commercial",
    vimeoId: "1202001984",
    thumbnail:
      "/work/mandi-holding.jpg",
    featured: false,
    description: "Corporate and portrait photography for Mandi Holding.",
  },
  {
    slug: "who-i-am",
    title: "Who Am I?",
    category: "narrative",
    vimeoId: "1202299048",
    thumbnail:
      "/work/who-i-am.webp",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/aiza_web.mp4",
    featured: false,
    description:
      "A cinematic character piece built around mood, performance, and intimate framing.",
  },
];
