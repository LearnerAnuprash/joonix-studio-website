export const planOptions = [
  { value: "launch", label: "A website: Launch plan, from Rs. 15,000" },
  { value: "scale", label: "An online shop: Scale plan, from Rs. 60,000" },
  {
    value: "custom",
    label: "A custom platform: Custom plan, from Rs. 1,50,000",
  },
  { value: "apps", label: "A web or mobile app, from Rs. 1,00,000" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const budgetOptions = [
  { value: "under-50k", label: "Under Rs. 50,000" },
  { value: "50k-150k", label: "Rs. 50,000 to 1,50,000" },
  { value: "150k-300k", label: "Rs. 1,50,000 to 3,00,000" },
  { value: "over-300k", label: "Above Rs. 3,00,000" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export type PlanChoice = (typeof planOptions)[number]["value"];
export type BudgetChoice = (typeof budgetOptions)[number]["value"];

export type EnquiryField =
  "name" | "email" | "phone" | "plan" | "budget" | "message";

export type EnquiryValues = Record<EnquiryField, string>;

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const enquiryLimits = {
  name: { min: 2, max: 100 },
  message: { min: 20, max: 4000 },
  phone: { max: 20 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;

export function isPlanChoice(
  value: string | null | undefined,
): value is PlanChoice {
  return planOptions.some((option) => option.value === value);
}

export function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();

  if (name.length < enquiryLimits.name.min) {
    errors.name = "Name: enter at least 2 characters.";
  } else if (name.length > enquiryLimits.name.max) {
    errors.name = "Name: use 100 characters or fewer.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Email: enter an address like name@example.com.";
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = "Phone: use digits, spaces and an optional + only.";
  }

  if (!isPlanChoice(values.plan)) {
    errors.plan = "What you need: choose the closest option.";
  }

  if (!budgetOptions.some((option) => option.value === values.budget)) {
    errors.budget = "Budget: choose a range, or Not sure yet.";
  }

  if (message.length < enquiryLimits.message.min) {
    errors.message =
      "Message: write at least 20 characters so we can reply usefully.";
  } else if (message.length > enquiryLimits.message.max) {
    errors.message = "Message: keep it under 4,000 characters.";
  }

  return errors;
}

export const emptyEnquiry: EnquiryValues = {
  name: "",
  email: "",
  phone: "",
  plan: "unsure",
  budget: "unsure",
  message: "",
};
