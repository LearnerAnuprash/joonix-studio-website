type Relatable = {
  slug: string;
  publishDate: Date;
  tags: { slug: string }[];
  services: string[];
};

export function scoreRelated(base: Relatable, candidate: Relatable): number {
  const tags = new Set(base.tags.map((tag) => tag.slug));
  const services = new Set(base.services);
  const sharedTags = candidate.tags.filter((tag) => tags.has(tag.slug)).length;
  const sharedServices = candidate.services.filter((service) =>
    services.has(service),
  ).length;
  return sharedServices * 3 + sharedTags * 2;
}

export function relatedItems<T extends Relatable>(
  base: T,
  candidates: T[],
  count = 3,
): T[] {
  return candidates
    .filter((candidate) => candidate.slug !== base.slug)
    .map((candidate) => ({ candidate, score: scoreRelated(base, candidate) }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.candidate.publishDate.getTime() - a.candidate.publishDate.getTime(),
    )
    .slice(0, count)
    .map(({ candidate }) => candidate);
}
