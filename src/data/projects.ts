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
  year: number;
  vimeoId: string;
  thumbnail: string;
  previewVideo?: string;
  featured: boolean;
  description: string;
}

export const SHOWREEL_VIMEO_ID = "982264133";

/** Local fullscreen hero background — replace file at public/hero/hero.mp4 */
export const HERO_VIDEO_SRC = "/hero/hero.mp4";

export const projects: Project[] = [
  {
    slug: "who-i-am",
    title: "Who I Am?",
    category: "narrative",
    year: 2023,
    vimeoId: "885891560",
    thumbnail:
      "/work/who-i-am.webp",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/aiza_web.mp4",
    featured: true,
    description:
      "A cinematic character piece built around mood, performance, and intimate framing.",
  },
  {
    slug: "porsche-gt3",
    title: "Porsche GT3",
    subtitle: "Commercial video for Porsche",
    category: "commercial",
    client: "Porsche",
    year: 2023,
    vimeoId: "843444596",
    thumbnail:
      "/work/porsche-gt3.jpg",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/Porsche.mp4",
    featured: true,
    description:
      "High-energy automotive commercial capturing the precision and presence of the Porsche GT3.",
  },
  {
    slug: "lamborghini-aventador",
    title: "Lamborghini Aventador",
    subtitle: "Lamborghini Aventador by RR Auto-Group",
    category: "commercial",
    client: "RR Auto-Group",
    year: 2024,
    vimeoId: "943821726",
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
    year: 2024,
    vimeoId: "955623164",
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
    year: 2024,
    vimeoId: "947169018",
    thumbnail:
      "/work/new-video-for-nuvola-capitanio.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/2024-07-14-06.33.35.mp4",
    featured: true,
    description:
      "International real estate storytelling for one of London's most distinctive penthouse properties.",
  },
  {
    slug: "soda-please",
    title: "Soda Please",
    subtitle: "Fizzy Obsession: A Bitter Twist",
    category: "commercial",
    year: 2023,
    vimeoId: "826808018",
    thumbnail:
      "/work/soda-please.webp",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/soda-4sec.mp4",
    featured: false,
    description:
      "Branded content with bold visual rhythm and stylized product storytelling.",
  },
  {
    slug: "muscle-intelligence",
    title: "Muscle Intelligence",
    subtitle: "Muscle Intelligence Camp in Spain 2024",
    category: "commercial",
    year: 2024,
    vimeoId: "943791067",
    thumbnail:
      "/work/muscle-intelligence.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/IMG_8213.mov",
    featured: false,
    description:
      "Event coverage and brand film capturing training, energy, and community on location in Spain.",
  },
  {
    slug: "gareth-west",
    title: "Gareth West",
    category: "commercial",
    year: 2024,
    vimeoId: "908917112",
    thumbnail:
      "/work/gareth-west.jpg",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/02/west.mov",
    featured: false,
    description: "Portrait-driven commercial piece focused on presence and performance.",
  },
  {
    slug: "new-video-for-upholstery-inc",
    title: "New Video For Upholstery Inc.",
    subtitle: "Fizzy Obsession: A Bitter Twist",
    category: "commercial",
    client: "Upholstery Inc.",
    year: 2023,
    vimeoId: "804426164",
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
    year: 2023,
    vimeoId: "851888830",
    thumbnail:
      "/work/aston-martin-vantage-v12.webp",
    featured: false,
    description:
      "Automotive film emphasizing lines, power, and luxury craftsmanship.",
  },
  {
    slug: "ben-pakulski",
    title: "Ben Pakulski",
    category: "commercial",
    year: 2023,
    vimeoId: "882311184",
    thumbnail:
      "/work/ben-pakulski.webp",
    featured: false,
    description:
      "Fitness and personal brand content with dynamic pacing and strong visual identity.",
  },
  {
    slug: "soda-please-ii-teaser",
    title: "Soda Please II",
    subtitle: "Teaser",
    category: "commercial",
    year: 2023,
    vimeoId: "826808018",
    thumbnail:
      "/work/soda-please-ii-teaser.webp",
    featured: false,
    description: "Teaser cut for the Soda Please campaign sequel.",
  },
  {
    slug: "growerev",
    title: "GroweRev",
    category: "commercial",
    year: 2023,
    vimeoId: "885891560",
    thumbnail:
      "/work/growerev.webp",
    featured: false,
    description: "Brand film with editorial pacing and product-focused visuals.",
  },
  {
    slug: "mandi-holding",
    title: "Mandi Holding",
    category: "commercial",
    year: 2023,
    vimeoId: "885891560",
    thumbnail:
      "/work/mandi-holding.jpg",
    featured: false,
    description: "Corporate and portrait photography for Mandi Holding.",
  },
];
