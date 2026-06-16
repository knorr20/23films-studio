export type ProjectCategory = "video" | "photo" | "bts";

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

export const HERO_VIDEO_URL =
  "https://23films.studio/wp-content/themes/just1page/video/bg.mp4";

export const projects: Project[] = [
  {
    slug: "23-production-showreel-2023",
    title: "23 Production — Showreel 2023",
    subtitle: "Showreel 2023",
    category: "video",
    client: "23 Production",
    year: 2023,
    vimeoId: "982264133",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2024/08/scrnew2023.jpg",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/08/2024-07-15-10.10.36-3.mp4",
    featured: true,
    description:
      "A curated showcase of commercial, automotive, and luxury real estate work from 23 Production.",
  },
  {
    slug: "who-i-am",
    title: "Who I Am?",
    category: "video",
    year: 2023,
    vimeoId: "885891560",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/65592b63b8b004eea7752d8d_1-p-1080.webp",
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
    category: "video",
    client: "Porsche",
    year: 2023,
    vimeoId: "843444596",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/64b6a24ea18be6fe240a5f71_Снимок-экрана-2023-07-16-в-05.36.30-p-1080.jpg",
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
    category: "video",
    client: "RR Auto-Group",
    year: 2024,
    vimeoId: "943821726",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2024/07/Снимок-экрана-2024-07-14-в-06.26.55.png",
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
    category: "video",
    client: "Nuvola Capitanio",
    year: 2024,
    vimeoId: "955623164",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2024/07/Снимок-экрана-2024-07-14-в-06.30.30.png",
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
    category: "video",
    client: "Nuvola Capitanio",
    year: 2024,
    vimeoId: "947169018",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2024/07/Снимок-экрана-2024-07-14-в-06.29.51.png",
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
    category: "video",
    year: 2023,
    vimeoId: "826808018",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/64649624945bf822a802ac5e_soda-preview-p-1600.webp",
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
    category: "video",
    year: 2024,
    vimeoId: "943791067",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2024/07/Снимок-экрана-2024-07-14-в-05.20.37.png",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/07/IMG_8213.mov",
    featured: false,
    description:
      "Event coverage and brand film capturing training, energy, and community on location in Spain.",
  },
  {
    slug: "gareth-west",
    title: "Gareth West",
    category: "video",
    year: 2024,
    vimeoId: "908917112",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2024/02/IMG_5976.jpg",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2024/02/west.mov",
    featured: false,
    description: "Portrait-driven commercial piece focused on presence and performance.",
  },
  {
    slug: "new-video-for-upholstery-inc",
    title: "New Video For Upholstery Inc.",
    subtitle: "Fizzy Obsession: A Bitter Twist",
    category: "video",
    client: "Upholstery Inc.",
    year: 2023,
    vimeoId: "804426164",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/645c02ab7f980aae710c8764_photo_2023-05-10_23-43-59-2-p-1080.jpg",
    previewVideo:
      "https://23films.studio/wp-content/uploads/2023/12/car-4sec-—-youtube.mp4",
    featured: false,
    description:
      "Commercial production for Upholstery Inc. with cinematic automotive detailing.",
  },
  {
    slug: "aston-martin-vantage-v12",
    title: "Aston Martin Vantage V12",
    category: "video",
    client: "Aston Martin",
    year: 2023,
    vimeoId: "851888830",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/65592bb8309c6b9c06c49a68_1v2-p-1080.webp",
    featured: false,
    description:
      "Automotive film emphasizing lines, power, and luxury craftsmanship.",
  },
  {
    slug: "ben-pakulski",
    title: "Ben Pakulski",
    category: "video",
    year: 2023,
    vimeoId: "882311184",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/65592c21262466a4130e6913_1v2-p-1080.webp",
    featured: false,
    description:
      "Fitness and personal brand content with dynamic pacing and strong visual identity.",
  },
  {
    slug: "soda-please-ii-teaser",
    title: "Soda Please II",
    subtitle: "Teaser",
    category: "video",
    year: 2023,
    vimeoId: "826808018",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/65592cbbf4d3d4dd56249237_6v2-p-1080.webp",
    featured: false,
    description: "Teaser cut for the Soda Please campaign sequel.",
  },
  {
    slug: "growerev",
    title: "GroweRev",
    category: "video",
    year: 2023,
    vimeoId: "885891560",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/65592d0bde12de54c5f27b73_1v2-p-1080.webp",
    featured: false,
    description: "Brand film with editorial pacing and product-focused visuals.",
  },
  {
    slug: "ruffian-who-am-i",
    title: "Ruffian — Who Am I",
    category: "bts",
    year: 2023,
    vimeoId: "885891560",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/645c0196fc14bd721a8c6180_photo_2023-05-10_23-39-25-p-1080.jpg",
    featured: false,
    description: "Behind-the-scenes look at the Ruffian Who Am I production.",
  },
  {
    slug: "smoke-vibe",
    title: "Smoke Vibe",
    category: "photo",
    year: 2023,
    vimeoId: "885891560",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/645c993e0fe52c02c007136b_Untitled_1.1.1-p-1080.jpg",
    featured: false,
    description: "Stylized photo session with atmospheric lighting and editorial composition.",
  },
  {
    slug: "mandi-holding",
    title: "Mandi Holding",
    category: "photo",
    year: 2023,
    vimeoId: "885891560",
    thumbnail:
      "https://23films.studio/wp-content/uploads/2023/12/645c985069005d56e8b99325_8-img-p-1080.jpg",
    featured: false,
    description: "Corporate and portrait photography for Mandi Holding.",
  },
];
