'use client';

import MainLayout from '@/components/layout/main-layout';
import HeroSection from '@/components/sections/hero-section';
import USPSection from '@/components/sections/usp-section';
import FacilitiesSection from '@/components/sections/facilities-section';
import CTASection from '@/components/sections/cta-section';

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <USPSection />
      <FacilitiesSection />
      <CTASection />
    </MainLayout>
  );
}
