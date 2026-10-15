import HeroSection from '@/sections/HeroSection';
import FeaturedProducts from '@/sections/FeaturedProducts';
import AboutPreview from '@/sections/AboutPreview';
import VisionPreview from '@/sections/VisionPreview';
import TestimonialsPreview from '@/sections/TestimonialsPreview';
import Newsletter from '@/sections/Newsletter';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <AboutPreview />
      <VisionPreview />
      <TestimonialsPreview />
      <Newsletter />
    </>
  );
}
