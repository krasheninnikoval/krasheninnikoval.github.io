import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { profile, site } from "@/content";

/** Разметка для поисковиков: кто автор сайта. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: site.url,
  sameAs: [profile.telegram.url],
};

export default function HomePage() {
  return (
    <>
      <Header variant="home" />
      <main className="flex-1">
        <Hero />
        <ProjectsSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </>
  );
}
