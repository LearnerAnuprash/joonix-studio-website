import { Container } from "@/components/layout/Container";

export function Divider() {
  return (
    <Container aria-hidden="true">
      <hr className="border-t border-border" />
    </Container>
  );
}
