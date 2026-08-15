import type { Metadata } from "next";

import { AboutNavigation } from "@/components/about/AboutNavigation";
import { ProfessionalProfile } from "@/components/about/ProfessionalProfile";
import { CareerJourney } from "@/components/about/CareerJourney";
import { CapabilityExplorer } from "@/components/about/CapabilityExplorer";
import { ExperienceList } from "@/components/about/ExperienceList";
import { SelectedWork } from "@/components/about/SelectedWork";
import { SelectedImpact } from "@/components/about/SelectedImpact";
import { ProfessionalPrinciples } from "@/components/about/ProfessionalPrinciples";
import { EducationDevelopment } from "@/components/about/EducationDevelopment";
import { ResumePreview } from "@/components/about/ResumePreview";
import { ContactCTA } from "@/components/about/ContactCTA";

export const metadata: Metadata = {
  title: "About",
  description: "Professional profile of Daniel Trujillo, Industrial Engineer.",
};

export default function AboutPage() {
  return (
    <>
      <ProfessionalProfile />

      <div className="sticky top-16 z-30 border-t border-b border-border bg-background/90">
        <div className="mx-auto max-w-5xl px-6 py-2 md:px-0">
          <AboutNavigation />
        </div>
      </div>

      <CareerJourney />
      <CapabilityExplorer />
      <ExperienceList />
      <SelectedWork />
      <SelectedImpact />
      <ProfessionalPrinciples />
      <EducationDevelopment />
      <ResumePreview />
      <ContactCTA />
    </>
  );
}