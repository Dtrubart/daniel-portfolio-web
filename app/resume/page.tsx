import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { ResumeContent } from "@/components/resume/ResumeContent";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Professional resume for Daniel Trujillo — Industrial Engineer specializing in data, ERP & business systems, operations, automation, and process improvement.",
};

export default function ResumePage() {
  return (
    <Container className="py-16 md:py-24">
      <ResumeContent />
    </Container>
  );
}
