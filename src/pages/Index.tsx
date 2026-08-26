import Hero from "@/components/Hero";
import LatestReleases from "@/components/LatestReleases";
import About from "@/components/About";
import Services from "@/components/Services";
import Press from "@/components/Press";
import Tour from "@/components/Tour";
import Social from "@/components/Social";
import OtherProjects from "@/components/OtherProjects";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { content } = useLanguage();
  const latest = content.releases.slice(0, 3).map((r) => r.title).join(", ");

  return (
    <main className="min-h-screen">
      <Seo
        title="MIM AL — Indie Rock, Math Rock & Alternative Rock from Montreal"
        description={`MIM AL is a Bangladeshi-Canadian guitarist, singer-songwriter and producer from Montreal making indie rock, math rock, midwest emo and alternative rock. Latest releases: ${latest}.`}
        path="/"
        keywords="MIM AL, MimTheHuman, Montreal indie rock, math rock, midwest emo, alternative rock, Bangladeshi-Canadian musician, session guitarist Montreal, MIM AL releases, MIM AL tour"
      />
      <Hero />
      <LatestReleases />
      <Tour />
      <About />
      <Services />
      <OtherProjects />
      <Social />
      <Footer />
    </main>
  );
};

export default Index;
