import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type PostPaginationProps = {
  current: number;
  total: number;
  basePath: string;
  className?: string;
};

export function pageHref(basePath: string, page: number): string {
  return page <= 1 ? basePath : `${basePath}/page/${page}`;
}

export function PostPagination({
  current,
  total,
  basePath,
  className,
}: PostPaginationProps) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <Pagination className={cn("border-t border-border pt-8", className)}>
      <PaginationContent className="w-full justify-between gap-4">
        <PaginationItem className="min-w-24">
          {current > 1 && (
            <PaginationPrevious href={pageHref(basePath, current - 1)} />
          )}
        </PaginationItem>
        <PaginationItem>
          <ul className="flex items-center gap-1">
            {pages.map((page) => (
              <li key={page}>
                <PaginationLink
                  href={pageHref(basePath, page)}
                  isActive={page === current}
                  aria-label={`Page ${page}`}
                >
                  {page}
                </PaginationLink>
              </li>
            ))}
          </ul>
        </PaginationItem>
        <PaginationItem className="flex min-w-24 justify-end">
          {current < total && (
            <PaginationNext href={pageHref(basePath, current + 1)} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
