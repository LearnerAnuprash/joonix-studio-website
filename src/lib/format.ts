const TIME_ZONE = "Asia/Kathmandu";

const groupFormat = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: TIME_ZONE,
});

const shortDateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: TIME_ZONE,
});

const isoDayFormat = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: TIME_ZONE,
});

export function formatNumber(value: number): string {
  return groupFormat.format(value);
}

export function formatMoney(value: number): string {
  return `Rs. ${formatNumber(value)}`;
}

export function formatMoneyRange(min: number, max?: number): string {
  if (max === undefined || max === min) return formatMoney(min);
  return `${formatMoney(min)} to ${formatNumber(max)}`;
}

export function formatMoneyParts(min: number, max?: number): [string, string?] {
  if (max === undefined || max === min) return [formatMoney(min)];
  return [formatMoney(min), `to ${formatNumber(max)}`];
}

export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

export function formatShortDate(date: Date): string {
  return shortDateFormat.format(date);
}

export function isoDay(date: Date): string {
  return isoDayFormat.format(date);
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
