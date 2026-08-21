"use client";

import { useState, useRef } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  ContactReason,
  ContactReasonOption,
  ContactFormValues,
  contactReasons,
  fieldLimits,
} from "@/data/contact";

interface ContactFormProps {
  defaultReason?: ContactReason;
}

interface FormErrors {
  name?: string;
  email?: string;
  reason?: string;
  subject?: string;
  message?: string;
  submit?: string;
}

type FormState = "idle" | "submitting" | "success" | "error";

const INPUT_BASE =
  "mt-1 block w-full rounded-md border bg-popover text-foreground shadow-xs transition-colors outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";
const INPUT_ERROR =
  "border-destructive focus:border-destructive focus:ring-destructive/30";
const INPUT_OK = "border-input focus:border-ring focus:ring-ring/30";

function inputClassName(error?: string): string {
  return cn(INPUT_BASE, error ? INPUT_ERROR : INPUT_OK);
}

function getReasonDefaults(reason: ContactReason): { subject: string; message: string } {
  const option = contactReasons.find((r) => r.value === reason);
  if (option) {
    return { subject: option.defaultSubject, message: option.defaultMessage };
  }
  const other = contactReasons.find((r) => r.value === "other")!;
  return { subject: other.defaultSubject, message: other.defaultMessage };
}

const emptyValues: ContactFormValues = {
  name: "",
  email: "",
  company: "",
  reason: contactReasons[0].value,
  subject: "",
  message: "",
  website: "",
};

export function ContactForm({ defaultReason }: ContactFormProps) {
  const initialReason = defaultReason ?? contactReasons[0].value;
  const [values, setValues] = useState<ContactFormValues>({
    ...emptyValues,
    reason: initialReason,
    ...getReasonDefaults(initialReason),
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<FormState>("idle");
  const [startedAt, setStartedAt] = useState<number>(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const prevReasonRef = useRef<ContactReason>(initialReason);
  const prevPresetsRef = useRef<{
    subject: string;
    message: string;
  }>(getReasonDefaults(initialReason));

  function handleReasonChange(next: ContactReason) {
    if (next === values.reason) return;

    const prevPresets = prevPresetsRef.current;
    const nextPresets = getReasonDefaults(next);

    const subjectUnchanged =
      values.subject === prevPresets.subject || values.subject.trim() === "";
    const messageUnchanged =
      values.message === prevPresets.message || values.message.trim() === "";

    setValues((prev) => ({
      ...prev,
      reason: next,
      subject: subjectUnchanged ? nextPresets.subject : prev.subject,
      message: messageUnchanged ? nextPresets.message : prev.message,
    }));

    prevReasonRef.current = next;
    prevPresetsRef.current = nextPresets;
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};

    const nameTrimmed = values.name.trim();
    if (!nameTrimmed) {
      newErrors.name = "Please enter your name.";
    } else if (nameTrimmed.length < fieldLimits.name.min) {
      newErrors.name = "Your name must be at least 2 characters.";
    } else if (nameTrimmed.length > fieldLimits.name.max) {
      newErrors.name = "Your name is too long.";
    }

    if (!values.email) {
      newErrors.email = "Please enter your email address.";
    } else if (values.email.length > fieldLimits.email.max) {
      newErrors.email = "Email address is too long.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(values.email)) {
        newErrors.email = "Enter a valid email address.";
      }
    }

    const subjectTrimmed = values.subject.trim();
    if (!subjectTrimmed) {
      newErrors.subject = "Please add a subject.";
    } else if (subjectTrimmed.length < fieldLimits.subject.min) {
      newErrors.subject = "Your subject is too short.";
    } else if (subjectTrimmed.length > fieldLimits.subject.max) {
      newErrors.subject = "Your subject is too long.";
    }

    const messageTrimmed = values.message.trim();
    if (!messageTrimmed) {
      newErrors.message = "Please enter your message.";
    } else if (messageTrimmed.length < fieldLimits.message.min) {
      newErrors.message = `Your message must be at least ${fieldLimits.message.min} characters.`;
    } else if (messageTrimmed.length > fieldLimits.message.max) {
      newErrors.message = "Your message is too long.";
    }

    if (!contactReasons.some((r) => r.value === values.reason)) {
      newErrors.reason = "Please select a reason.";
    }

    return newErrors;
  }

  function handleFieldChange(
    field: keyof ContactFormValues,
  ): (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
    return (e) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field as keyof FormErrors]: undefined }));
      }
    };
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setState("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          reason: values.reason,
          subject: values.subject.trim(),
          message: values.message.trim(),
          website: values.website,
          startedAt,
        }),
      });

      const result = (await response.json()) as { ok?: boolean };

      if (response.ok && result.ok) {
        setState("success");
        const resetReason = contactReasons[0].value;
        const defaults = getReasonDefaults(resetReason);
        setValues({ ...emptyValues, reason: resetReason, ...defaults });
        prevReasonRef.current = resetReason;
        prevPresetsRef.current = defaults;
      } else if (response.status === 400) {
        setErrors({ submit: "Please check your entries and try again." });
        setState("error");
      } else if (response.status === 429) {
        setErrors({ submit: "Too many requests. Please try again in a minute." });
        setState("error");
      } else {
        setErrors({ submit: "Something went wrong while sending your message. Please try again." });
        setState("error");
      }
    } catch {
      setErrors({ submit: "Something went wrong while sending your message. Please try again." });
      setState("error");
    }
  }

  function resetForm() {
    const resetReason = contactReasons[0].value;
    const defaults = getReasonDefaults(resetReason);
    setValues({ ...emptyValues, reason: resetReason, ...defaults });
    setErrors({});
    setState("idle");
    prevReasonRef.current = resetReason;
    prevPresetsRef.current = defaults;
    setStartedAt(Date.now());
    formRef.current?.querySelector("input")?.focus();
  }

  const currentReasonOption: ContactReasonOption =
    contactReasons.find((r) => r.value === values.reason) ?? contactReasons[0];

  if (state === "success") {
    return (
      <div className="space-y-4" aria-live="polite" aria-atomic="true">
        <div
          className="rounded-md border border-green-600/30 bg-green-500/5 p-4 text-sm"
          role="status"
        >
          <p className="font-medium text-green-700 dark:text-green-300">
            Message sent.
          </p>
          <p className="mt-1 text-foreground">
            Thanks for reaching out. Your message has been delivered.
          </p>
        </div>
        <Button variant="secondary" onClick={resetForm} type="button">
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={values.website}
        onChange={(e) => setValues((prev) => ({ ...prev, website: e.target.value }))}
        className="sr-only"
        aria-hidden="true"
        aria-label="Leave this field empty"
      />

      <div className="space-y-6">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-foreground"
          >
            Name <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={values.name}
            onChange={handleFieldChange("name")}
            required
            maxLength={fieldLimits.name.max}
            minLength={fieldLimits.name.min}
            className={inputClassName(errors.name)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            disabled={state === "submitting"}
          />
          {errors.name && (
            <p
              id="contact-name-error"
              className="mt-2 text-sm text-destructive"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-foreground"
          >
            Email <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleFieldChange("email")}
            required
            maxLength={fieldLimits.email.max}
            className={inputClassName(errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            disabled={state === "submitting"}
          />
          {errors.email && (
            <p
              id="contact-email-error"
              className="mt-2 text-sm text-destructive"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-company"
            className="block text-sm font-medium text-foreground"
          >
            Company / Organization
          </label>
          <input
            id="contact-company"
            type="text"
            name="company"
            value={values.company}
            onChange={handleFieldChange("company")}
            maxLength={fieldLimits.company.max}
            className={inputClassName()}
            disabled={state === "submitting"}
          />
        </div>

        <div>
          <span className="block text-sm font-medium text-foreground">
            Reason <span className="text-destructive">*</span>
          </span>
          <fieldset
            className="mt-2 flex flex-wrap gap-3"
            role="radiogroup"
            aria-label="Contact reason"
          >
            {contactReasons.map((option) => {
              const isSelected = values.reason === option.value;
              return (
                <div key={option.value} className="flex items-center">
                  <input
                    id={`reason-${option.value}`}
                    type="radio"
                    name="reason"
                    value={option.value}
                    checked={isSelected}
                    onChange={() => handleReasonChange(option.value)}
                    disabled={state === "submitting"}
                    className="sr-only"
                    aria-label={option.label}
                  />
                  <label
                    htmlFor={`reason-${option.value}`}
                    className={cn(
                      "inline-flex cursor-pointer items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                      "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
                      isSelected
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-secondary text-foreground hover:bg-secondary/80",
                    )}
                  >
                    {option.label}
                  </label>
                </div>
              );
            })}
          </fieldset>
          {errors.reason && (
            <p
              id="contact-reason-error"
              className="mt-2 text-sm text-destructive"
              role="alert"
            >
              {errors.reason}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-subject"
            className="block text-sm font-medium text-foreground"
          >
            Subject <span className="text-destructive">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            name="subject"
            value={values.subject}
            onChange={handleFieldChange("subject")}
            required
            maxLength={fieldLimits.subject.max}
            minLength={fieldLimits.subject.min}
            className={inputClassName(errors.subject)}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            disabled={state === "submitting"}
          />
          {errors.subject && (
            <p
              id="contact-subject-error"
              className="mt-2 text-sm text-destructive"
              role="alert"
            >
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-sm font-medium text-foreground"
          >
            Message <span className="text-destructive">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={values.message}
            onChange={handleFieldChange("message")}
            required
            minLength={fieldLimits.message.min}
            maxLength={fieldLimits.message.max}
            rows={6}
            className={inputClassName(errors.message)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            disabled={state === "submitting"}
          />
          {errors.message && (
            <p
              id="contact-message-error"
              className="mt-2 text-sm text-destructive"
              role="alert"
            >
              {errors.message}
            </p>
          )}
        </div>

        <div className="min-h-5" aria-live="polite" aria-atomic="true">
          {errors.submit && (
            <p className="text-sm text-destructive" role="alert">
              {errors.submit}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            Reason:{" "}
            <span className="font-medium text-foreground">
              {currentReasonOption.label}
            </span>
          </p>
          <Button
            type="submit"
            variant="primary"
            disabled={state === "submitting"}
            aria-busy={state === "submitting"}
          >
            {state === "submitting" ? "Sending…" : "Send message"}
          </Button>
        </div>
      </div>
    </form>
  );
}
