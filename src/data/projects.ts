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
    thumbnail: "/work/porsche-gt3/vimeo-poster.jpg",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/Porsche.mp4",
    featured: true,
    description:
      "COMMERCIAL FOR PORSCHE GT3 — PACE, PRECISION, AND PRESENCE IN MOTION. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/porsche-gt3/still01.png",
      "/work/porsche-gt3/still02.png",
      "/work/porsche-gt3/still03.png",
      "/work/porsche-gt3/still04.png",
      "/work/porsche-gt3/still05.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "lamborghini-aventador",
    title: "Lamborghini Aventador",
    category: "commercial",
    client: "RR Auto-Group",
    vimeoId: "1202006049",
    thumbnail: "/work/lamborghini-aventador/vimeo-poster.jpg",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/IMG_5279-1.mp4",
    featured: true,
    description:
      "COMMERCIAL FOR RR AUTO-GROUP — DRAMATIC LIGHT, OPEN ROAD, AND PRESENCE IN MOTION. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/lamborghini-aventador/still01.png",
      "/work/lamborghini-aventador/still02.png",
      "/work/lamborghini-aventador/still03.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "estate-in-palma-de-mallorca-spain",
    title: "Mallorca Estate",
    category: "commercial",
    client: "Engel & Völkers",
    vimeoId: "1202300697",
    thumbnail: "/work/estate-in-palma-de-mallorca-spain/still01.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/IMG_5282.mp4",
    featured: true,
    description:
      "COMMERCIAL FOR ENGEL & VÖLKERS — MALLORCA ESTATE: ARCHITECTURE, LANDSCAPE, AND MEDITERRANEAN LIFESTYLE. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/estate-in-palma-de-mallorca-spain/still01.png",
      "/work/estate-in-palma-de-mallorca-spain/still02.png",
      "/work/estate-in-palma-de-mallorca-spain/still03.png",
      "/work/estate-in-palma-de-mallorca-spain/still04.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "new-video-for-nuvola-capitanio",
    title: "London's Most Unique Penthouse",
    category: "commercial",
    client: "Engel & Völkers",
    vimeoId: "1202300317",
    thumbnail: "/work/new-video-for-nuvola-capitanio/still01.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/2024-07-14-06.33.35.mp4",
    featured: true,
    description:
      "COMMERCIAL FOR ENGEL & VÖLKERS — LONDON'S MOST DISTINCTIVE PENTHOUSE. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/new-video-for-nuvola-capitanio/still01.png",
      "/work/new-video-for-nuvola-capitanio/still02.png",
      "/work/new-video-for-nuvola-capitanio/still03.png",
      "/work/new-video-for-nuvola-capitanio/still04.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "ben-pakulski",
    title: "Ben Pakulski",
    category: "commercial",
    client: "Ben Pakulski",
    vimeoId: "1202001870",
    thumbnail: "/work/ben-pakulski/vimeo-poster.jpg",
    featured: true,
    description:
      "Fitness and personal brand content with dynamic pacing and strong visual identity. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/ben-pakulski/still01.webp",
      "/work/ben-pakulski/still02.webp",
      "/work/ben-pakulski/still03.webp",
      "/work/ben-pakulski/still04.webp",
    ],
    stillsFit: "contain",
  },
  {
    slug: "sam-asghari-forge",
    title: "Forge",
    category: "commercial",
    client: "Sam Asghari",
    vimeoId: "1126304067",
    thumbnail: "/work/sam-asghari-forge/vimeo-poster.jpg",
    featured: false,
    description:
      "BRAND FILM FOR SAM ASGHARI — BOXING RINGS, DESERT GRIND, GOLDEN HOUR TRAINING, AND RAW ATHLETIC POWER. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/sam-asghari-forge/still01.png",
      "/work/sam-asghari-forge/still02.png",
      "/work/sam-asghari-forge/still03.png",
      "/work/sam-asghari-forge/still04.png",
      "/work/sam-asghari-forge/still05.png",
      "/work/sam-asghari-forge/still06.png",
    ],
    stillsFit: "contain",
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
    stills: [
      "/work/artbat-braev-humans/still01.png",
      "/work/artbat-braev-humans/still02.png",
      "/work/artbat-braev-humans/still03.png",
      "/work/artbat-braev-humans/still04.png",
      "/work/artbat-braev-humans/still05.png",
      "/work/artbat-braev-humans/still06.png",
      "/work/artbat-braev-humans/still07.png",
      "/work/artbat-braev-humans/still08.png",
      "/work/artbat-braev-humans/still09.png",
    ],
    stillsFit: "contain",
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
    stills: [
      "/work/morten-artbat-culture/still01.png",
      "/work/morten-artbat-culture/still02.png",
      "/work/morten-artbat-culture/still03.png",
      "/work/morten-artbat-culture/still04.png",
      "/work/morten-artbat-culture/still05.png",
      "/work/morten-artbat-culture/still06.png",
      "/work/morten-artbat-culture/still07.png",
      "/work/morten-artbat-culture/still08.png",
      "/work/morten-artbat-culture/still09.png",
      "/work/morten-artbat-culture/still10.png",
    ],
    stillsFit: "contain",
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
      "BRAND CAMPAIGN FOR LUCENT — YACHT LIFE, COASTAL GOLDEN HOUR, AND EDITORIAL EASE ON THE OPEN WATER. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/lucent-out-to-sea/still01.png",
      "/work/lucent-out-to-sea/still02.png",
      "/work/lucent-out-to-sea/still03.png",
      "/work/lucent-out-to-sea/still04.png",
      "/work/lucent-out-to-sea/still05.png",
      "/work/lucent-out-to-sea/still06.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "lucent-show-up",
    title: "Show Up",
    category: "commercial",
    client: "Lucent",
    vimeoId: "1202001083",
    thumbnail: "/work/lucent-show-up.jpg",
    featured: false,
    description:
      "BRAND CAMPAIGN FOR LUCENT — EDITORIAL PORTRAITS, LUXURY FASHION, AND THE ENERGY OF ARRIVAL. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/lucent-show-up/still01.png",
      "/work/lucent-show-up/still02.png",
      "/work/lucent-show-up/still03.png",
      "/work/lucent-show-up/still04.png",
      "/work/lucent-show-up/still05.png",
      "/work/lucent-show-up/still06.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "lucent-frame-by-frame",
    title: "Frame by Frame",
    category: "commercial",
    client: "Lucent",
    vimeoId: "1134984176",
    thumbnail: "/work/lucent-frame-by-frame.jpg",
    featured: false,
    description:
      "BRAND CAMPAIGN FOR LUCENT — VINTAGE CALIFORNIA, FILM GRAIN, AND ROMANCE CAPTURED FRAME BY FRAME. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/lucent-frame-by-frame/still01.png",
      "/work/lucent-frame-by-frame/still02.png",
      "/work/lucent-frame-by-frame/still03.png",
      "/work/lucent-frame-by-frame/still04.png",
      "/work/lucent-frame-by-frame/still05.png",
      "/work/lucent-frame-by-frame/still06.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "growerev",
    title: "GroweRev Brand Film",
    category: "commercial",
    client: "GroweRev",
    vimeoId: "1202001868",
    thumbnail: "/work/growerev.webp",
    featured: false,
    description:
      "BRAND FILM FOR GROWEREV — EDITORIAL PACING AND PRODUCT-FOCUSED VISUALS. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/growerev/still01.webp",
      "/work/growerev/still02.webp",
      "/work/growerev/still03.webp",
      "/work/growerev/still04.webp",
    ],
    stillsFit: "contain",
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
      "/work/soda-please/still01.webp",
      "/work/soda-please/still02.webp",
      "/work/soda-please/still03.webp",
      "/work/soda-please/still04.webp",
    ],
    stillsFit: "contain",
  },
  {
    slug: "muscle-intelligence",
    title: "Muscle Intelligence",
    category: "commercial",
    client: "Ben Pakulski",
    vimeoId: "1202001871",
    thumbnail: "/work/muscle-intelligence.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/IMG_8213.mov",
    featured: false,
    description:
      "EVENT COVERAGE AND BRAND FILM CAPTURING TRAINING, ENERGY, AND COMMUNITY. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/muscle-intelligence/still01.png",
      "/work/muscle-intelligence/still02.png",
      "/work/muscle-intelligence/still03.png",
      "/work/muscle-intelligence/still04.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "new-video-for-upholstery-inc",
    title: "New Life Upholstery",
    category: "commercial",
    client: "New Life",
    vimeoId: "1126299379",
    thumbnail: "/work/new-video-for-upholstery-inc.jpg",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/car-4sec-—-youtube.mp4",
    featured: false,
    description:
      "COMMERCIAL FOR NEW LIFE — UPHOLSTERY REIMAGINED WITH CINEMATIC AUTOMOTIVE DETAIL. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/new-video-for-upholstery-inc/still01.jpg",
      "/work/new-video-for-upholstery-inc/still02.webp",
      "/work/new-video-for-upholstery-inc/still03.webp",
      "/work/new-video-for-upholstery-inc/still04.webp",
    ],
    stillsFit: "contain",
  },
  {
    slug: "aston-martin-vantage-v12",
    title: "Aston Martin Vantage V12",
    category: "commercial",
    client: "Aston Martin",
    vimeoId: "1126296330",
    thumbnail: "/work/aston-martin-vantage-v12.webp",
    featured: false,
    description:
      "Automotive film emphasizing lines, power, and luxury craftsmanship. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/aston-martin-vantage-v12/still01.webp",
      "/work/aston-martin-vantage-v12/still02.webp",
      "/work/aston-martin-vantage-v12/still03.webp",
      "/work/aston-martin-vantage-v12/still04.png",
    ],
    stillsFit: "contain",
  },
  {
    slug: "soda-please-ii-teaser",
    title: "Soda Please II",
    subtitle: "Original Soda Please II · Teaser",
    cardMeta: "Original",
    category: "narrative",
    vimeoId: "1202300493",
    thumbnail: "/work/soda-please-ii-teaser.webp",
    featured: false,
    description:
      "SHORT FILM TEASER — FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/soda-please-ii-teaser/still01.webp",
      "/work/soda-please-ii-teaser/still02.webp",
      "/work/soda-please-ii-teaser/still03.webp",
      "/work/soda-please-ii-teaser/still04.webp",
    ],
    stillsFit: "contain",
  },
  {
    slug: "mandi-holding",
    title: "City of Tomorrow",
    category: "commercial",
    client: "Mardi Holding",
    vimeoId: "1202001984",
    thumbnail: "/work/mandi-holding.jpg",
    featured: false,
    description:
      "BRAND FILM FOR MARDI HOLDING — AERIAL VIEWS OF PROPERTIES, DEVELOPMENT, AND INFOGRAPHIC STORYTELLING. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/mandi-holding/still01.jpg",
      "/work/mandi-holding/still02.webp",
      "/work/mandi-holding/still03.webp",
      "/work/mandi-holding/still04.webp",
    ],
    stillsFit: "contain",
  },
  {
    slug: "who-i-am",
    title: "Who Am I?",
    category: "narrative",
    client: "Original",
    vimeoId: "1202299048",
    thumbnail: "/work/who-i-am.webp",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/aiza_web.mp4",
    featured: false,
    description:
      "A cinematic character piece built around mood, performance, and intimate framing. FULL PRODUCTION BY 23 FILMS, FROM CONCEPT TO POST.",
    stills: [
      "/work/who-i-am/still01.webp",
      "/work/who-i-am/still02.webp",
      "/work/who-i-am/still03.webp",
      "/work/who-i-am/still04.webp",
    ],
    stillsFit: "contain",
  },
];
