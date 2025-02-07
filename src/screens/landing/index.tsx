"use client";
import HeroSection from "@/src/components/hero/Hero";
import ServicesSection from "@/src/components/projects/Projects";
import AboutSection from "@/src/components/welcome";
import MainLayout from "@/src/layout/mainLayout";

export default function LandingScreen() {
  return (
    <MainLayout>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
    </MainLayout>
  );
}
