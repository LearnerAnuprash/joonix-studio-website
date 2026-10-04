import { Badge } from "@/components/ui/badge";
import type { TechGroup } from "@/data/types";
import { cn } from "@/lib/utils";

type TechListProps = {
  groups: TechGroup[];
  className?: string;
};

export function TechList({ groups, className }: TechListProps) {
  return (
    <dl className={cn("border-t border-border", className)}>
      {groups.map((group) => (
        <div
          key={group.group}
          className="page-grid items-center gap-y-3 border-b border-border py-5"
        >
          <dt className="col-span-full text-sm font-medium md:col-span-3 lg:col-span-4">
            {group.group}
          </dt>
          <dd className="col-span-full flex flex-wrap gap-2 md:col-span-5 lg:col-span-8">
            {group.items.map((item) => (
              <Badge key={item} variant="quiet">
                {item}
              </Badge>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
