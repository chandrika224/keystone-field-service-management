import HeroSection
  from "@/components/public/Home/HeroSection";

import CoreFeaturesSection
  from "@/components/public/Home/CoreFeaturesSection";

import HowItWorksSection
  from "@/components/public/Home/HowItWorksSection";

import RolesSection
  from "@/components/public/Home/RolesSection";

import ProductPreviewSection
  from "@/components/public/Home/ProductPreviewSection";

import CallToActionSection
  from "@/components/public/Home/CallToActionSection";


export default function Home() {
  return (
    <div>

      <HeroSection />

      <CoreFeaturesSection />

      <HowItWorksSection />

      <RolesSection />

      <ProductPreviewSection />

      <CallToActionSection />

    </div>
  );
}