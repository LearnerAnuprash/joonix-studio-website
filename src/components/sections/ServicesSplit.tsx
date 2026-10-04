import { CheckIcon } from "lucide-react";

import { ArrowLink } from "@/components/common/ArrowLink";
import type { Service } from "@/data/types";
import { cn } from "@/lib/utils";

type ServicesSplitProps = {
  services: Service[];
  className?: string;
};

export function ServicesSplit({ services, className }: ServicesSplitProps) {
  return (
    <div
      className={cn(
        "grid border-t border-border lg:grid-cols-2 lg:divide-x lg:divide-border",
        className,
      )}
    >
      {services.map((service, index) => (
        <article
          key={service.slug}
          aria-labelledby={`service-${service.slug}`}
          className={cn(
            "flex flex-col gap-8 py-10 reveal md:py-12",
            index > 0 &&
              "border-t border-border lg:border-t-0 lg:pl-12 xl:pl-16",
            index === 0 && "lg:pr-12 xl:pr-16",
          )}
        >
          <div className="flex flex-col gap-4">
            <h3 id={`service-${service.slug}`} className="text-h2">
              {service.title}
            </h3>
            <p className="max-w-xl text-muted-foreground">{service.summary}</p>
          </div>
          <ul className="flex flex-col border-t border-border">
            {service.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-border py-3"
              >
                <CheckIcon aria-hidden="true" className="size-5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <ArrowLink href={`/services/${service.slug}`}>
            {service.title} in detail
          </ArrowLink>
        </article>
      ))}
    </div>
  );
}
