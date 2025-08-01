import AboutSection from "@/components/sections/about-section";
import CTASection from "@/components/sections/cta-section";
import GallerySection from "@/components/sections/gallery-section";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/sevices-section";
import TestimonySection from "@/components/sections/testimony-section";

export default function Home() {
  return (
    
    <>
      <HeroSection/>
      <AboutSection/>
      <GallerySection/>
      <ServicesSection/>
      <CTASection/>
      <TestimonySection/>
    </>
  );
}
