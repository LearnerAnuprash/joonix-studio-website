import type { ProcessStep, Stat } from "@/data/types";
import { ph } from "@/lib/placeholder";

export const process: ProcessStep[] = [
  {
    title: "Discovery call",
    duration: ph("Free, 30 minutes", "Discovery call length"),
    body: "We ask about your business, your customers and what the site or app has to do. You get straight advice, even if we are not the right fit.",
  },
  {
    title: "Written scope and quote",
    duration: ph("Within 3 working days", "Time to written quote"),
    body: "A fixed price, the list of pages or features, and a timeline. No hourly surprises.",
  },
  {
    title: "Design and build",
    duration: ph("2 to 8 weeks, by plan", "Build duration range"),
    body: "You see progress every week on a private preview link and can comment on anything.",
  },
  {
    title: "Launch and care",
    duration: "Monthly care plan",
    body: "We launch, show your team how to edit content, and look after hosting, updates and backups.",
  },
];

export const commitments: Stat[] = [
  {
    value: ph("1 day", "Reply time promise"),
    label: "to reply to a new enquiry, on working days",
  },
  {
    value: ph("3 days", "Time to written quote"),
    label: "from discovery call to a written, fixed quote",
  },
  {
    value: "Weekly",
    label: "progress you can open on a private preview link",
  },
  {
    value: "100%",
    label: "of the code, content and domain stays yours",
  },
];
