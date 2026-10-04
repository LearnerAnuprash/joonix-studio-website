export const POSTS_PER_PAGE = 12;

export type Page<T> = {
  items: T[];
  current: number;
  total: number;
};

export function pageCount(length: number, perPage = POSTS_PER_PAGE): number {
  return Math.max(1, Math.ceil(length / perPage));
}

export function pageOf<T>(
  items: T[],
  current: number,
  perPage = POSTS_PER_PAGE,
): Page<T> {
  const total = pageCount(items.length, perPage);
  const start = (current - 1) * perPage;
  return { items: items.slice(start, start + perPage), current, total };
}
