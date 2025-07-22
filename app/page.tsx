import { Hero } from "@/components/hero"
import { FeaturedProperties } from "@/components/featured-properties"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StatisticsDashboard } from "@/components/statistics-dashboard"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProperties />
      <HowItWorks />
      <Testimonials />
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <StatisticsDashboard />
        </div>
      </section>
      <Footer />
    </div>
  )
}
