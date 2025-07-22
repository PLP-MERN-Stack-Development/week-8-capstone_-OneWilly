import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageCircle, HandshakeIcon as HandShake, Shield } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search & Discover",
      description:
        "Browse through thousands of verified properties across Uganda with advanced filters and map search.",
    },
    {
      icon: MessageCircle,
      title: "Connect & Chat",
      description:
        "Chat directly with property owners and brokers in real-time. Get instant responses to your questions.",
    },
    {
      icon: Shield,
      title: "Verify & Inspect",
      description: "All properties undergo verification. Schedule inspections and get detailed property reports.",
    },
    {
      icon: HandShake,
      title: "Secure Transaction",
      description: "Complete your transaction securely with our escrow service and legal documentation support.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How Broka256 Works</h2>
          <p className="text-lg text-gray-600">Your journey to finding the perfect property in 4 simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
