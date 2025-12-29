import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofStrip from "@/components/SocialProofStrip";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import LeadFormSection from "@/components/LeadFormSection";
import Footer from "@/components/Footer";
import StickyWhatsApp from "@/components/StickyWhatsApp";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Fitmentors | Personal Training by Rajath Simha | Bangalore & Online</title>
        <meta
          name="description"
          content="Sustainable fitness coaching for busy professionals. In-person training in Bangalore and online coaching worldwide. 10+ years experience. Book your free assessment."
        />
        <meta name="keywords" content="personal trainer bangalore, fitness coach india, online personal training, weight loss coach, strength training, fitmentors, rajath simha" />
        <meta property="og:title" content="Fitmentors | Personal Training That Fits Your Life" />
        <meta property="og:description" content="Sustainable fitness coaching for busy professionals. No extremes. No burnout. Just disciplined progress." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://fitmentors.in" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <SocialProofStrip />
        <TestimonialsSection />
        <AboutSection />
        <PricingSection />
        <LeadFormSection />
        <Footer />
        <StickyWhatsApp />
      </main>
    </>
  );
};

export default Index;
