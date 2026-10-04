import { PUBLIC_ENV } from "astro:env/client";

export type Placeholder = {
  value: string;
  note: string;
};

const registry = new Map<string, Placeholder>();

export function ph(value: string, note: string): string {
  if (PUBLIC_ENV === "production") {
    throw new Error(`Unresolved placeholder "${value}" (${note})`);
  }
  registry.set(value, { value, note });
  return value;
}

export function placeholders(): Placeholder[] {
  return [...registry.values()];
}
