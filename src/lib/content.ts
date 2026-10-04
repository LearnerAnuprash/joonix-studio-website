import type { MarkdownInstance } from "astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { PUBLIC_ENV } from "astro:env/client";

import { about } from "@/data/fixtures/about";
import { authors } from "@/data/fixtures/authors";
import { home, hero } from "@/data/fixtures/home";
import { pricing } from "@/data/fixtures/pricing";
import { commitments, process } from "@/data/fixtures/process";
import { services } from "@/data/fixtures/services";
import { tags } from "@/data/fixtures/tags";
import { work } from "@/data/fixtures/work";
import { site } from "@/data/site";
import type {
  Author,
  CaseStudy,
  Faq,
  LegalPage,
  Post,
  PostSummary,
  Service,
  ServiceSlug,
  Tag,
} from "@/data/types";
import { readingTime } from "@/lib/reading-time";
import { relatedItems } from "@/lib/related";

type PostFrontmatter = {
  title: string;
  description: string;
  publishDate: string | Date;
  updatedDate?: string | Date;
  author: string;
  tags: string[];
  services?: ServiceSlug[];
  answer: string;
  takeaways: string[];
  faqs?: Faq[];
  draft?: boolean;
};

type LegalFrontmatter = {
  title: string;
  description: string;
  updatedDate: string | Date;
};

const postModules = import.meta.glob<MarkdownInstance<PostFrontmatter>>(
  "/src/data/fixtures/posts/*.md",
  { eager: true },
);

const legalModules = import.meta.glob<MarkdownInstance<LegalFrontmatter>>(
  "/src/data/fixtures/legal/*.md",
  { eager: true },
);

export const showDrafts = PUBLIC_ENV !== "production";

function slugFromFile(file: string): string {
  return file.split("/").pop()?.replace(/\.md$/, "") ?? file;
}

export function toDate(value: string | Date): Date {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(`${value}T00:00:00+05:45`);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime()))
    throw new Error(`Invalid date "${String(value)}"`);
  return date;
}

function requireItem<T>(item: T | undefined, message: string): T {
  if (item === undefined) throw new Error(message);
  return item;
}

export function getSite() {
  return site;
}

export function getHome() {
  return { hero, ...home };
}

export function getAbout() {
  return about;
}

export function getServices(): Service[] {
  return [...services].sort((a, b) => a.order - b.order);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function serviceLabel(slug: ServiceSlug): string {
  return getService(slug)?.title ?? slug;
}

export function getPricing() {
  return pricing;
}

export function getProcess() {
  return process;
}

export function getCommitments() {
  return commitments;
}

export function getWork(): CaseStudy[] {
  return work
    .filter((item) => showDrafts || !item.draft)
    .sort((a, b) => a.order - b.order);
}

export function getWorkItem(slug: string): CaseStudy | undefined {
  return getWork().find((item) => item.slug === slug);
}

export function getFeaturedWork(): CaseStudy[] {
  return getWork().filter((item) => item.featured);
}

export function getWorkByService(slug: ServiceSlug): CaseStudy[] {
  return getWork().filter((item) => item.services.includes(slug));
}

export function getTags(): Tag[] {
  return tags;
}

export function getTag(slug: string): Tag | undefined {
  return tags.find((tag) => tag.slug === slug);
}

export function getAuthors(): Author[] {
  return authors;
}

export function getAuthor(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}

type LoadedPost = {
  post: Post;
  Content: AstroComponentFactory;
  body: string;
};

function loadPost(
  file: string,
  module: MarkdownInstance<PostFrontmatter>,
): LoadedPost {
  const data = module.frontmatter;
  const slug = slugFromFile(file);
  const body = module.rawContent();
  const post: Post = {
    slug,
    title: data.title,
    description: data.description,
    publishDate: toDate(data.publishDate),
    updatedDate: data.updatedDate ? toDate(data.updatedDate) : undefined,
    readingTime: readingTime(`${data.answer} ${body}`),
    tags: data.tags.map((tag) =>
      requireItem(getTag(tag), `Unknown tag "${tag}" in post "${slug}"`),
    ),
    author: requireItem(
      getAuthor(data.author),
      `Unknown author "${data.author}" in post "${slug}"`,
    ),
    draft: data.draft ?? false,
    answer: data.answer,
    takeaways: data.takeaways,
    faqs: data.faqs ?? [],
    services: data.services ?? [],
    headings: module
      .getHeadings()
      .filter((heading) => heading.depth === 2 || heading.depth === 3),
  };
  return { post, Content: module.Content, body };
}

const allPosts = Object.entries(postModules)
  .map(([file, module]) => loadPost(file, module))
  .sort((a, b) => b.post.publishDate.getTime() - a.post.publishDate.getTime());

export function isPublished(post: PostSummary, now = new Date()): boolean {
  if (post.draft) return false;
  return post.publishDate.getTime() <= now.getTime();
}

function visiblePosts(): LoadedPost[] {
  return allPosts.filter(({ post }) => showDrafts || isPublished(post));
}

export function toSummary(post: Post): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishDate: post.publishDate,
    updatedDate: post.updatedDate,
    readingTime: post.readingTime,
    tags: post.tags,
    author: post.author,
    draft: post.draft || !isPublished(post),
  };
}

export function getPosts(): PostSummary[] {
  return visiblePosts().map(({ post }) => toSummary(post));
}

export function getPost(slug: string): LoadedPost | undefined {
  return visiblePosts().find(({ post }) => post.slug === slug);
}

export function getPostEntries(): LoadedPost[] {
  return visiblePosts();
}

export function getPostsByTag(slug: string): PostSummary[] {
  return visiblePosts()
    .filter(({ post }) => post.tags.some((tag) => tag.slug === slug))
    .map(({ post }) => toSummary(post));
}

export function getPostsByAuthor(slug: string): PostSummary[] {
  return visiblePosts()
    .filter(({ post }) => post.author.slug === slug)
    .map(({ post }) => toSummary(post));
}

export function getPostsByService(slug: ServiceSlug): PostSummary[] {
  return visiblePosts()
    .filter(({ post }) => post.services.includes(slug))
    .map(({ post }) => toSummary(post));
}

export function getRelatedPosts(post: Post, count = 3): PostSummary[] {
  return relatedItems(
    post,
    visiblePosts().map(({ post: candidate }) => candidate),
    count,
  ).map(toSummary);
}

export function getUsedTags(): Tag[] {
  const used = new Set(
    visiblePosts().flatMap(({ post }) => post.tags.map((tag) => tag.slug)),
  );
  return tags.filter((tag) => used.has(tag.slug));
}

export function getLegalPage(slug: LegalPage["slug"]) {
  const entry = Object.entries(legalModules).find(
    ([file]) => slugFromFile(file) === slug,
  );
  const [, module] = requireItem(entry, `Missing legal page "${slug}"`);
  const page: LegalPage = {
    slug,
    title: module.frontmatter.title,
    description: module.frontmatter.description,
    updatedDate: toDate(module.frontmatter.updatedDate),
  };
  return {
    page,
    Content: module.Content,
    headings: module.getHeadings().filter((heading) => heading.depth === 2),
  };
}
