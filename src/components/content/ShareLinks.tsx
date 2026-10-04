import { useEffect, useRef, useState } from "react";
import { CheckIcon, LinkIcon } from "lucide-react";

import { TextLink } from "@/components/common/TextLink";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShareLinksProps = {
  url: string;
  title: string;
  className?: string;
};

function shareTargets(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  return [
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "X",
      href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];
}

export function ShareLinks({ url, title, className }: ShareLinksProps) {
  const [status, setStatus] = useState("");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied");
    } catch {
      setStatus("Copy failed. Select the address bar and copy the link.");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus(""), 4000);
  };

  const copied = status === "Link copied";

  return (
    <section
      aria-labelledby="share-heading"
      className={cn("flex flex-col gap-4", className)}
    >
      <h2
        id="share-heading"
        className="text-caption font-medium text-muted-foreground"
      >
        Share this article
      </h2>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button type="button" variant="outline" size="sm" onClick={copy}>
          {copied ? <CheckIcon /> : <LinkIcon />}
          {copied ? "Copied" : "Copy link"}
        </Button>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {shareTargets(url, title).map((target) => (
            <li key={target.label}>
              <TextLink href={target.href} newTab>
                {target.label}
              </TextLink>
            </li>
          ))}
        </ul>
      </div>
      <p
        aria-live="polite"
        className="min-h-5 text-caption text-muted-foreground"
      >
        {status}
      </p>
    </section>
  );
}
