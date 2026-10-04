export function normalizePath(path: string): string {
  const trimmed = path.replace(/\.html$/, "").replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function isCurrentPath(currentPath: string, href: string): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}
