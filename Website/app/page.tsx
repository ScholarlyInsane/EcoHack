import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { HowItWorksPreview } from "@/components/home/how-it-works-preview"
import { WasteCategories } from "@/components/home/waste-categories"
import { FeaturesSection } from "@/components/home/features-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksPreview />
        <WasteCategories />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
