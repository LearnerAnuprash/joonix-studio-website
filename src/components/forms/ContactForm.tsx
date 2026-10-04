import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type SubmitEvent,
} from "react";
import {
  ArrowRightIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  LoaderCircleIcon,
  WifiOffIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import {
  budgetOptions,
  emptyEnquiry,
  isPlanChoice,
  planOptions,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryField,
  type EnquiryValues,
} from "@/lib/enquiry";
import { cn } from "@/lib/utils";

export type ContactFormStatus =
  "idle" | "submitting" | "success" | "error" | "offline";

type ContactFormProps = {
  action: string;
  email: string;
  emailHref: string;
  whatsappHref: string;
  replyPromise: string;
  privacyHref: string;
  preview?: {
    status: ContactFormStatus;
    values?: Partial<EnquiryValues>;
    showErrors?: boolean;
  };
  className?: string;
};

const fieldOrder: EnquiryField[] = [
  "name",
  "email",
  "phone",
  "plan",
  "budget",
  "message",
];

function subscribeNothing() {
  return () => {};
}

function readPlanParam(): string | null {
  const plan = new URLSearchParams(window.location.search).get("plan");
  return isPlanChoice(plan) ? plan : null;
}

function readServerPlan(): string | null {
  return null;
}

function readSource(): string {
  const url = new URL(window.location.href);
  const utm = [...url.searchParams.entries()]
    .filter(([key]) => key.startsWith("utm_"))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return utm ? `${url.pathname}?${utm}` : url.pathname;
}

export function ContactForm({
  action,
  email,
  emailHref,
  whatsappHref,
  replyPromise,
  privacyHref,
  preview,
  className,
}: ContactFormProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<EnquiryValues>({
    ...emptyEnquiry,
    ...preview?.values,
  });
  const [errors, setErrors] = useState<EnquiryErrors>(() =>
    preview?.showErrors
      ? validateEnquiry({ ...emptyEnquiry, ...preview.values })
      : {},
  );
  const [status, setStatus] = useState<ContactFormStatus>(
    preview?.status ?? "idle",
  );
  const [planTouched, setPlanTouched] = useState(false);
  const urlPlan = useSyncExternalStore(
    subscribeNothing,
    readPlanParam,
    readServerPlan,
  );
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  const current: EnquiryValues = {
    ...values,
    plan: !planTouched && !preview && urlPlan ? urlPlan : values.plan,
  };

  useEffect(() => {
    if (status === "success" && !preview) statusRef.current?.focus();
  }, [status, preview]);

  const update = (field: EnquiryField, value: string) => {
    if (field === "plan") setPlanTouched(true);
    setValues((previous) => ({ ...previous, [field]: value }));
    if (errors[field]) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[field];
        return next;
      });
    }
  };

  const submit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (preview || status === "submitting") return;

    const nextErrors = validateEnquiry(current);
    setErrors(nextErrors);
    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    if (!navigator.onLine) {
      setStatus("offline");
      return;
    }

    setStatus("submitting");
    const payload = {
      ...Object.fromEntries(new FormData(event.currentTarget).entries()),
      startedAt: String(mountedAt.current),
      source: readSource(),
    };
    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setStatus("success");
        return;
      }
      if (response.status === 422) {
        const body = (await response.json().catch(() => ({}))) as {
          errors?: EnquiryErrors;
        };
        if (body.errors) setErrors(body.errors);
      }
      setStatus("error");
    } catch {
      setStatus(navigator.onLine ? "error" : "offline");
    }
  };

  const describedBy = (field: EnquiryField, hint?: boolean) =>
    [
      hint ? `${id}-${field}-hint` : "",
      errors[field] ? `${id}-${field}-error` : "",
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className={cn(
          "flex flex-col items-start gap-6 rounded-lg border border-input p-6 md:p-10",
          className,
        )}
      >
        <CircleCheckIcon aria-hidden="true" className="size-8" />
        <div className="flex flex-col gap-3">
          <h2 className="text-h3">
            Thanks
            {values.name.trim() ? `, ${values.name.trim().split(" ")[0]}` : ""}.
            Your enquiry is with us.
          </h2>
          <p className="max-w-lg text-muted-foreground">
            {replyPromise} We sent a short confirmation to{" "}
            {values.email.trim() || "your email"}. If it is urgent, message us
            on WhatsApp.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href={whatsappHref} rel="noopener">
            Message us on WhatsApp
            <ArrowRightIcon />
          </a>
        </Button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      ref={formRef}
      action={action}
      method="post"
      noValidate
      onSubmit={submit}
      aria-busy={submitting || undefined}
      className={cn("flex flex-col gap-10", className)}
    >
      <FieldGroup className="md:grid-cols-2">
        <Field invalid={Boolean(errors.name)}>
          <FieldLabel htmlFor={`${id}-name`}>Your name</FieldLabel>
          <Input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name) || undefined}
            aria-describedby={describedBy("name")}
          />
          <FieldError id={`${id}-name-error`}>{errors.name}</FieldError>
        </Field>
        <Field invalid={Boolean(errors.email)}>
          <FieldLabel htmlFor={`${id}-email`}>Email</FieldLabel>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={Boolean(errors.email) || undefined}
            aria-describedby={describedBy("email")}
          />
          <FieldError id={`${id}-email-error`}>{errors.email}</FieldError>
        </Field>
        <Field invalid={Boolean(errors.phone)} className="md:col-span-2">
          <FieldLabel htmlFor={`${id}-phone`}>Phone or WhatsApp</FieldLabel>
          <FieldDescription id={`${id}-phone-hint`}>
            Optional. Add the country code if you are outside Nepal.
          </FieldDescription>
          <Input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone) || undefined}
            aria-describedby={describedBy("phone", true)}
            className="md:max-w-[calc(50%-12px)]"
          />
          <FieldError id={`${id}-phone-error`}>{errors.phone}</FieldError>
        </Field>
        <Field invalid={Boolean(errors.plan)}>
          <FieldLabel htmlFor={`${id}-plan`}>What do you need?</FieldLabel>
          <NativeSelect
            id={`${id}-plan`}
            name="plan"
            value={current.plan}
            onChange={(event) => update("plan", event.target.value)}
            aria-invalid={Boolean(errors.plan) || undefined}
            aria-describedby={describedBy("plan")}
          >
            {planOptions.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldError id={`${id}-plan-error`}>{errors.plan}</FieldError>
        </Field>
        <Field invalid={Boolean(errors.budget)}>
          <FieldLabel htmlFor={`${id}-budget`}>Budget</FieldLabel>
          <NativeSelect
            id={`${id}-budget`}
            name="budget"
            value={values.budget}
            onChange={(event) => update("budget", event.target.value)}
            aria-invalid={Boolean(errors.budget) || undefined}
            aria-describedby={describedBy("budget")}
          >
            {budgetOptions.map((option) => (
              <NativeSelectOption key={option.value} value={option.value}>
                {option.label}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldError id={`${id}-budget-error`}>{errors.budget}</FieldError>
        </Field>
        <Field invalid={Boolean(errors.message)} className="md:col-span-2">
          <FieldLabel htmlFor={`${id}-message`}>
            Tell us about the project
          </FieldLabel>
          <FieldDescription id={`${id}-message-hint`}>
            What does the business do, and what should the site or app help
            with? A few sentences is plenty.
          </FieldDescription>
          <Textarea
            id={`${id}-message`}
            name="message"
            required
            maxLength={4000}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            aria-invalid={Boolean(errors.message) || undefined}
            aria-describedby={describedBy("message", true)}
          />
          <FieldError id={`${id}-message-error`}>{errors.message}</FieldError>
        </Field>
      </FieldGroup>

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {(status === "error" || status === "offline") && (
        <div
          role="alert"
          className="flex gap-4 rounded-lg border-2 border-foreground p-5"
        >
          {status === "offline" ? (
            <WifiOffIcon
              aria-hidden="true"
              className="mt-0.5 size-6 shrink-0"
            />
          ) : (
            <CircleAlertIcon
              aria-hidden="true"
              className="mt-0.5 size-6 shrink-0"
            />
          )}
          <div className="flex flex-col gap-1">
            <p className="font-medium">
              {status === "offline"
                ? "You are offline, so the enquiry did not send."
                : "Your enquiry did not send because of a problem on our side."}
            </p>
            <p className="text-sm text-muted-foreground">
              {status === "offline" ? (
                "Check your connection and press Send enquiry again. Everything you typed is still here."
              ) : (
                <>
                  Press Send enquiry to try again, or email us at{" "}
                  <a href={emailHref} className="text-foreground link">
                    {email}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col items-start gap-5 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-caption text-muted-foreground">
          We use your details only to reply to this enquiry. Read the{" "}
          <a href={privacyHref} className="text-foreground link">
            privacy policy
          </a>
          .
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="shrink-0"
        >
          {submitting ? (
            <>
              <LoaderCircleIcon className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRightIcon />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
