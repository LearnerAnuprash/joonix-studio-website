import { Badge } from "@/components/ui/badge";

type DraftNoticeProps = {
  label: string;
};

export function DraftNotice({ label }: DraftNoticeProps) {
  return (
    <Badge variant="solid" className="self-start">
      {label}
    </Badge>
  );
}
