import type { Author } from "@/data/types";
import { ph } from "@/lib/placeholder";

export const authors: Author[] = [
  {
    slug: "joonix-studio",
    name: "Joonix Studio",
    role: ph(
      "Editorial team, Kathmandu",
      "Blog author: a named person is better for E-E-A-T",
    ),
    bio: "Articles from the Joonix Studio team, written from the websites, shops and apps we build for clients in Nepal and abroad.",
    kind: "organization",
    links: [],
  },
];
