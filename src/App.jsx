import Footer from "./component/Footer";
import Header from "./component/Header";
import HeroSection from "./component/hero-section/HeroSection";
import BlogSection from "./component/blog-section/BlogSection";
import SponsorsCarousel from "./component/sponsors-caroussel/SponsorsCaroussel";
import ProjectsSection from "./component/projects-section/ProjectsSection";
import Separator from "./component/ui/Separator";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-navyDark to-purpleDeep">
      <Header />
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>
      <Separator />
      {/* Blog Section */}
      <section id="blog">
        <BlogSection languageCode="en" />
      </section>
      <Separator />
      {/* Projects Section */}

      <section id="projects">
        <ProjectsSection />
      </section>
      <Separator />
      {/* Sponsors Carousel */}
      <section id="sponsors">
        <SponsorsCarousel />
      </section>
      <Separator />
      {/* Footer */}

      <Footer />
    </div>
  );
}

export default App;
