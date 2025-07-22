import { CompetitiveAnalysis } from "@/components/competitive-analysis"
import { BusinessModel } from "@/components/business-model"
import { SocialImpact } from "@/components/social-impact"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Broka256</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Revolutionizing property discovery in Northern Uganda through AI-powered matching and real-time
              communication
            </p>
          </div>
        </section>

        {/* Social Impact */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <SocialImpact />
          </div>
        </section>

        {/* Business Model */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <BusinessModel />
          </div>
        </section>

        {/* Competitive Analysis */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <CompetitiveAnalysis />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
