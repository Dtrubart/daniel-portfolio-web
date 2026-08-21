import type { NextRequest } from "next/server";
import { Resend } from "resend";

import type { ContactReason } from "@/data/contact";
import { contactReasons, fieldLimits } from "@/data/contact";

interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
  reason: string;
  subject: string;
  message: string;
  website?: string;
  startedAt?: number;
}

interface SuccessResponse {
  ok: true;
}

interface ErrorResponse {
  ok: false;
  error: string;
}

type ContactResponse = SuccessResponse | ErrorResponse;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: string): boolean {
  if (email.length > fieldLimits.email.max) return false;
  return EMAIL_REGEX.test(email);
}

function isValidReason(reason: string): reason is ContactReason {
  return contactReasons.some((r) => r.value === reason);
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function validateBody(body: unknown): { valid: true; data: ContactRequestBody } | { valid: false; error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, error: "validation" };
  }

  const record = body as Record<string, unknown>;

  if (!isString(record.name)) {
    return { valid: false, error: "validation" };
  }
  if (!isString(record.email)) {
    return { valid: false, error: "validation" };
  }
  if (!isString(record.reason)) {
    return { valid: false, error: "validation" };
  }
  if (!isString(record.subject)) {
    return { valid: false, error: "validation" };
  }
  if (!isString(record.message)) {
    return { valid: false, error: "validation" };
  }

  const data: ContactRequestBody = {
    name: record.name,
    email: record.email,
    company: isString(record.company) ? record.company : "",
    reason: record.reason,
    subject: record.subject,
    message: record.message,
    website: isString(record.website) ? record.website : "",
    startedAt: typeof record.startedAt === "number" ? record.startedAt : undefined,
  };

  const nameLen = data.name.trim().length;
  if (nameLen < fieldLimits.name.min || nameLen > fieldLimits.name.max) {
    return { valid: false, error: "validation" };
  }

  if (!isValidEmail(data.email)) {
    return { valid: false, error: "validation" };
  }

  if (!isValidReason(data.reason)) {
    return { valid: false, error: "validation" };
  }

  const subjectLen = data.subject.trim().length;
  if (subjectLen < fieldLimits.subject.min || subjectLen > fieldLimits.subject.max) {
    return { valid: false, error: "validation" };
  }

  const msgLen = data.message.trim().length;
  if (msgLen < fieldLimits.message.min || msgLen > fieldLimits.message.max) {
    return { valid: false, error: "validation" };
  }

  if (data.company && data.company.length > fieldLimits.company.max) {
    return { valid: false, error: "validation" };
  }

  return { valid: true, data };
}

export async function POST(request: NextRequest): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return responseJson({ ok: false, error: "validation" }, 400);
  }

  const validation = validateBody(body);
  if (!validation.valid) {
    return responseJson({ ok: false, error: "validation" }, 400);
  }

  const data = validation.data;

  if (data.website && data.website.trim().length > 0) {
    return responseJson({ ok: true }, 200);
  }

  if (typeof data.startedAt === "number" && Date.now() - data.startedAt < 1500) {
    return responseJson({ ok: true }, 200);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME ?? "Portfolio Contact";

  if (!apiKey || !toEmail || !fromEmail) {
    console.error("[contact] Environment configuration missing");
    return responseJson({ ok: false, error: "send_failed" }, 500);
  }

  const reasonOption = contactReasons.find((r) => r.value === data.reason);
  const reasonLabel = reasonOption ? reasonOption.label : data.reason;

  const emailSubject = `[Portfolio — ${reasonLabel}] ${data.subject.slice(0, 160)}`;

  const htmlLines: string[] = [];
  htmlLines.push("<h2>Portfolio Contact Form Submission</h2>");
  htmlLines.push(`<p><strong>Reason:</strong> ${escapeHtml(reasonLabel)}</p>`);
  htmlLines.push(`<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>`);
  htmlLines.push(`<p><strong>Visitor Email:</strong> ${escapeHtml(data.email)}</p>`);
  if (data.company && data.company.trim()) {
    htmlLines.push(`<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>`);
  }
  htmlLines.push(`<h3>Subject</h3><p>${escapeHtml(data.subject)}</p>`);
  htmlLines.push(`<h3>Message</h3><p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>`);
  const htmlContent = htmlLines.join("\n");

  const textLines: string[] = [];
  textLines.push("Portfolio Contact Form Submission");
  textLines.push("");
  textLines.push(`Reason: ${reasonLabel}`);
  textLines.push(`Name: ${data.name}`);
  textLines.push(`Visitor Email: ${data.email}`);
  if (data.company && data.company.trim()) {
    textLines.push(`Company: ${data.company}`);
  }
  textLines.push("");
  textLines.push(`Subject: ${data.subject}`);
  textLines.push("");
  textLines.push("Message:");
  textLines.push(data.message);
  const textContent = textLines.join("\n");

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      subject: emailSubject,
      html: htmlContent,
      text: textContent,
      replyTo: data.email,
    });

    return responseJson({ ok: true }, 200);
  } catch (err) {
    console.error("[contact] Email delivery failed:", err instanceof Error ? err.message : String(err));
    return responseJson({ ok: false, error: "send_failed" }, 500);
  }
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function responseJson(data: ContactResponse, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
