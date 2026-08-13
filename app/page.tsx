import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Capabilities } from "@/components/home/Capabilities";
import { SelectedExperience } from "@/components/home/SelectedExperience";
import { Certifications } from "@/components/home/Certifications";
import { CurrentWork } from "@/components/home/CurrentWork";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Capabilities />
      <SelectedExperience />
      <Certifications />
      <CurrentWork />
      <ContactCTA />
    </>
  );
}
