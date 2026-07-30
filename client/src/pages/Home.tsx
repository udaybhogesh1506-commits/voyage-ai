import Navbar from "../components/Navbar";
import Hero from "../components/home/Hero";
import Destinations from "../components/home/Destinations";
import Features from "../components/home/Features";
import HowItWorks from "../components/home/HowItWorks";
import AIShowcase from "../components/home/AIShowcase";
import Testimonials from "../components/home/Testimonials";
import Pricing from "../components/home/Pricing";
import OwnerSection from "../components/home/OwnerSection";
import Footer from "../components/home/Footer";
import AnimationWrapper from "../components/AnimationWrapper";
import CinematicBeachBackground from "../components/CinematicBeachBackground";

function Home() {
  return (
    <div className="voyage-home">
      <CinematicBeachBackground variant="home" />

      <div className="voyage-home-content">
        <Navbar />

        <AnimationWrapper>
          <Hero />
        </AnimationWrapper>

        <AnimationWrapper>
          <Destinations />
        </AnimationWrapper>

        <AnimationWrapper>
          <Features />
        </AnimationWrapper>

        <AnimationWrapper>
          <HowItWorks />
        </AnimationWrapper>

        <AnimationWrapper>
          <AIShowcase />
        </AnimationWrapper>

        <AnimationWrapper>
          <Testimonials />
        </AnimationWrapper>

        <AnimationWrapper>
          <Pricing />
        </AnimationWrapper>

        <AnimationWrapper>
          <OwnerSection />
        </AnimationWrapper>

        <Footer />
      </div>
    </div>
  );
}

export default Home;