import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedToolsSection } from '@/components/home/FeaturedToolsSection';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { ScreenshotEditorSection } from '@/components/home/ScreenshotEditorSection';
import { PrivacySection } from '@/components/home/PrivacySection';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedToolsSection />
      <CategoriesSection />
      <ScreenshotEditorSection />
      <PrivacySection />
      <CTASection />
    </>
  );
}
