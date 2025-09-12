import Hero from "@/components/Hero";
import LatestReleases from "@/components/LatestReleases";
import About from "@/components/About";
import Press from "@/components/Press";
import Tour from "@/components/Tour";
import Social from "@/components/Social";
import OtherProjects from "@/components/OtherProjects";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <LatestReleases />
      <Tour />
      <OtherProjects />
      <Social />
      <Footer />
    </main>
  );
};

export default Index;
