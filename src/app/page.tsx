import { Metadata } from "next";
import { Suspense, lazy } from "react";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import { siteConfig } from "@/lib/config";

// Lazy loading para componentes pesados
const OmnichannelSection = lazy(() => import("@/components/sections/OmnichannelSection"));
const ComparisonSection = lazy(() => import("@/components/sections/ComparisonSection"));
const TimelineSection = lazy(() => import("@/components/sections/TimelineSection"));
const IntegrationsSection = lazy(() => import("@/components/sections/IntegrationsSection"));
const AboutSection = lazy(() => import("@/components/sections/AboutSection"));
const ContactSection = lazy(() => import("@/components/sections/ContactSection"));
const LogoCarouselSection = lazy(() => import("@/components/sections/LogoCarouselSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const BlogPreview = lazy(() => import("@/components/ui/BlogPreview"));
const FloatingChat = lazy(() => import("@/components/ui/FloatingChat"));

// Componente de fallback para carregamento
const SectionSkeleton = () => (
  <div className="w-full py-16">
    <div className="container mx-auto px-4">
      <div className="w-full h-[400px] bg-muted/20 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.description}`,
  description: "Criamos automações personalizadas que economizam seu tempo e aumentam a produtividade da sua empresa. Automatize WhatsApp, redes sociais e muito mais.",
  keywords: ["Automação", "WhatsApp", "Redes Sociais", "n8n", "Produtividade", "Integração"],
  alternates: {
    canonical: "https://lucidium.ai",
  },
};

export default function Home() {
  return (
    <div className="relative">
      {/* Chat Flutuante (Client Component) */}
      <Suspense fallback={null}>
        <FloatingChat />
      </Suspense>
      
      {/* Seções do Site */}
      <HeroSection />
      <FeaturesSection />
      
      <Suspense fallback={<SectionSkeleton />}>
        <LogoCarouselSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <OmnichannelSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ComparisonSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <TimelineSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <IntegrationsSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <BlogPreview />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
    </div>
  );
} 