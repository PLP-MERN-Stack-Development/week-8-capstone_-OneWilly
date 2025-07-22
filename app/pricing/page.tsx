import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Shield } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free Trial",
      price: "Free",
      duration: "First 1 week",
      description: "Perfect for testing our platform",
      features: [
        "1 active property listing",
        "Basic search visibility",
        "Email notifications",
        "Property verification",
        "Basic support",
      ],
      limitations: ["Limited to 1 listing", "No priority placement", "No SMS notifications"],
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Premium",
      price: "UGX 6,000",
      duration: "per month",
      description: "Everything you need to succeed",
      features: [
        "Unlimited property listings",
        "Priority search placement",
        "SMS + Email notifications",
        "WhatsApp integration",
        "Live chat support",
        "Listing analytics",
        "Featured property badges",
        "Social media sharing",
        "Document verification",
        "24/7 customer support",
      ],
      limitations: [],
      buttonText: "Subscribe Now",
      buttonVariant: "default" as const,
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      duration: "Contact us",
      description: "For large agencies and developers",
      features: [
        "Everything in Premium",
        "Custom branding",
        "API access",
        "Bulk property import",
        "Advanced analytics",
        "Dedicated account manager",
        "Custom integrations",
        "White-label solution",
      ],
      limitations: [],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600 mb-8">Choose the perfect plan for your property business</p>

          {/* Special Offer Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-2">
              <Zap className="h-6 w-6 mr-2" />
              <span className="font-semibold">Limited Time Offer</span>
            </div>
            <p className="text-lg">
              Get 1 week FREE when you sign up today!
              <br />
              <span className="text-sm opacity-90">No setup fees, cancel anytime</span>
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-2 border-blue-500 shadow-xl scale-105" : "border shadow-lg"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                  {plan.duration && <span className="text-gray-600 ml-2">/{plan.duration}</span>}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Feature Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4">Features</th>
                  <th className="text-center py-4 px-4">Free Trial</th>
                  <th className="text-center py-4 px-4">Premium</th>
                  <th className="text-center py-4 px-4">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-4 px-4 font-medium">Property Listings</td>
                  <td className="text-center py-4 px-4">1</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                  <td className="text-center py-4 px-4">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Email Notifications</td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">SMS Notifications</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">WhatsApp Integration</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Priority Placement</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">Analytics Dashboard</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">Basic</td>
                  <td className="text-center py-4 px-4">Advanced</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium">API Access</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">-</td>
                  <td className="text-center py-4 px-4">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">How does the free trial work?</h3>
              <p className="text-gray-600 mb-4">
                New users get 1 week of free access with basic features. No credit card required to start.
              </p>

              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600 mb-4">
                Yes, you can cancel your subscription at any time. Your listings will remain active until the end of
                your billing period.
              </p>

              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept Mobile Money (MTN, Airtel), Visa, Mastercard, and bank transfers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Is there a setup fee?</h3>
              <p className="text-gray-600 mb-4">No setup fees. You only pay the monthly subscription fee.</p>

              <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 mb-4">
                We offer a 7-day money-back guarantee if you're not satisfied with our service.
              </p>

              <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Changes take effect immediately.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8">
            <Shield className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6">Join thousands of property owners and brokers already using Broka256</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
