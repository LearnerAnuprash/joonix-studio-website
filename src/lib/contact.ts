export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function phoneHref(phone: string): string {
  return `tel:+${digitsOnly(phone)}`;
}

export function emailHref(email: string, subject?: string): string {
  return subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
}

export function whatsappHref(phone: string, text?: string): string {
  const base = `https://wa.me/${digitsOnly(phone)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function formatPhone(phone: string): string {
  const digits = digitsOnly(phone);
  if (digits.startsWith("977") && digits.length === 13) {
    return `+977 ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return `+${digits}`;
}
