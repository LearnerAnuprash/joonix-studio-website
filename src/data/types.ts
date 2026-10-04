import type { MediaImage } from "@/components/media/Media";

export type NavItem = {
  label: string;
  href: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Point = {
  title: string;
  body: string;
};

export type ProcessStep = Point & {
  duration: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Quote = {
  text: string;
  name: string;
  role: string;
  company: string;
};

export type ClientLogo = {
  name: string;
  image?: MediaImage;
};

export type TechGroup = {
  group: string;
  items: string[];
};

export type ServiceSlug = "website-design" | "application-development";

export type Service = {
  slug: ServiceSlug;
  title: string;
  summary: string;
  answer: string;
  highlights: string[];
  audience: Point[];
  scope: Point[];
  deliverables: string[];
  tech: TechGroup[];
  priceFrom: number;
  priceNote: string;
  faqs: Faq[];
  order: number;
};

export type PlanId = "launch" | "scale" | "custom";

export type Plan = {
  id: PlanId;
  name: string;
  audience: string;
  setupMin: number;
  setupMax: number;
  careMin: number;
  careMax?: number;
  careFrom?: boolean;
  includes: string[];
  mostChosen: boolean;
};

export type Pricing = {
  title: string;
  intro: string;
  plans: Plan[];
  appDev: {
    title: string;
    from: number;
    note: string;
  };
  included: string[];
  faqs: Faq[];
};

export type Screenshot = {
  image?: MediaImage;
  alt: string;
  caption: string;
  ratio: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  year: number;
  services: ServiceSlug[];
  stack: string[];
  summary: string;
  result: string;
  metrics: Stat[];
  problem: string;
  approach: string;
  outcome: string;
  cover: Screenshot;
  screenshots: Screenshot[];
  quote?: Quote;
  featured: boolean;
  draft: boolean;
  order: number;
};

export type AuthorKind = "person" | "organization";

export type Author = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  kind: AuthorKind;
  links: NavItem[];
};

export type Tag = {
  slug: string;
  label: string;
  description: string;
};

export type Heading = {
  depth: number;
  slug: string;
  text: string;
};

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  publishDate: Date;
  updatedDate?: Date;
  readingTime: number;
  tags: Tag[];
  author: Author;
  draft: boolean;
};

export type Post = PostSummary & {
  answer: string;
  takeaways: string[];
  faqs: Faq[];
  services: ServiceSlug[];
  cover?: Screenshot;
  headings: Heading[];
};

export type Principle = Point;

export type LegalPage = {
  slug: "privacy" | "terms";
  title: string;
  description: string;
  updatedDate: Date;
};
