import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import LatestReleases from "@/components/LatestReleases";
import About from "@/components/About";
import Tour from "@/components/Tour";
import Services from "@/components/Services";
import OtherProjects from "@/components/OtherProjects";
import Social from "@/components/Social";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { content } = useLanguage();
  const { hash } = useLocation();
  const latest = content.releases.slice(0, 3).map((r) => r.title).join(", ");

  // The router restores the path but not the anchor, so arriving from a link
  // like /#releases has to scroll to the section itself.
  useEffect(() => {
    if (!hash) return;
    document.querySelector(hash)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
  }, [hash]);

  return (
    <main className="min-h-screen">
      <Seo
        title="MIM AL — Indie Rock, Math Rock & Alternative Rock from Montreal"
        description={`MIM AL is a Bangladeshi-Canadian guitarist, singer-songwriter and producer from Montreal making indie rock, math rock, midwest emo and alternative rock. Latest releases: ${latest}.`}
        path="/"
        keywords="MIM AL, MimTheHuman, Montreal indie rock, math rock, midwest emo, alternative rock, Bangladeshi-Canadian musician, session guitarist Montreal, MIM AL releases, MIM AL tour"
      />
      <SiteHeader />
      <Hero />
      <LatestReleases />
      <About />
      <Tour />
      {/* <Services /> */}
      <OtherProjects />
      <Social />
      <Footer />
    </main>
  );
};

export default Index;
