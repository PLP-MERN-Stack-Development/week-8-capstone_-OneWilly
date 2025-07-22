"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Users, Crown, Star, TrendingUp, Target, Zap, Shield, Gift } from "lucide-react"

interface PricingTierProps {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
  targetUsers: string
  icon: React.ReactNode
}

function PricingTier({
  name,
  price,
  period,
  description,
  features,
  popular = false,
  targetUsers,
  icon,
}: PricingTierProps) {
  return (
    <Card className={`relative ${popular ? "border-blue-500 shadow-lg" : ""}`}>
      {popular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">Most Popular</Badge>
      )}
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">{icon}</div>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">UGX {price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Target: {targetUsers}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <span className="text-green-500 mr-2 mt-0.5">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        <Button
          className={`w-full ${popular ? "bg-blue-500 hover:bg-blue-600" : ""}`}
          variant={popular ? "default" : "outline"}
        >
          Choose Plan
        </Button>
      </CardContent>
    </Card>
  )
}

export function BusinessModel() {
  const pricingTiers: PricingTierProps[] = [
    {
      name: "Free Explorer",
      price: "0",
      period: "month",
      description: "Perfect for casual property browsing",
      targetUsers: "Individual property seekers",
      icon: <Gift className="h-6 w-6 text-blue-600" />,
      features: [
        "Browse up to 50 properties per month",
        "Basic search and filters",
        "View property photos and details",
        "Contact property owners",
        "Mobile app access",
        "Email notifications",
      ],
    },
    {
      name: "Premium Seeker",
      price: "50,000",
      period: "month",
      description: "Enhanced features for serious buyers",
      targetUsers: "Active property buyers and renters",
      icon: <Star className="h-6 w-6 text-blue-600" />,
      popular: true,
      features: [
        "Unlimited property browsing",
        "AI-powered property matching",
        "Advanced search filters",
        "Real-time chat with brokers",
        "Property alerts and notifications",
        "Save unlimited favorites",
        "Priority customer support",
        "Market insights and reports",
      ],
    },
    {
      name: "Broker Pro",
      price: "150,000",
      period: "month",
      description: "Complete solution for real estate professionals",
      targetUsers: "Real estate brokers and agencies",
      icon: <Crown className="h-6 w-6 text-blue-600" />,
      features: [
        "List unlimited properties",
        "Featured property placements",
        "Lead management dashboard",
        "Analytics and performance metrics",
        "Bulk property upload",
        "Custom branding options",
        "API access for integrations",
        "Dedicated account manager",
        "Commission tracking tools",
      ],
    },
  ]

  const revenueStreams = [
    {
      name: "Subscription Revenue",
      description: "Monthly and annual subscription plans",
      percentage: 45,
      monthlyTarget: "UGX 25M",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Transaction Commissions",
      description: "3% commission on successful property transactions",
      percentage: 30,
      monthlyTarget: "UGX 18M",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      name: "Featured Listings",
      description: "Premium placement fees for property listings",
      percentage: 15,
      monthlyTarget: "UGX 8M",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "Partnership Revenue",
      description: "Revenue sharing with banks and financial institutions",
      percentage: 10,
      monthlyTarget: "UGX 5M",
      icon: <Target className="h-5 w-5" />,
    },
  ]

  const marketProjections = [
    { year: "Year 1", users: "5,000", revenue: "UGX 180M", growth: "Launch" },
    { year: "Year 2", users: "15,000", revenue: "UGX 540M", growth: "200%" },
    { year: "Year 3", users: "35,000", revenue: "UGX 1.2B", growth: "122%" },
    { year: "Year 4", users: "75,000", revenue: "UGX 2.5B", growth: "108%" },
    { year: "Year 5", users: "150,000", revenue: "UGX 4.8B", growth: "92%" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Business Model & Revenue Strategy</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Sustainable and scalable revenue model designed for the Northern Uganda market
        </p>
      </div>

      {/* Pricing Tiers */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Subscription Plans</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <PricingTier key={index} {...tier} />
          ))}
        </div>
      </div>

      {/* Revenue Streams */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Revenue Streams</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {revenueStreams.map((stream, index) => (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{stream.icon}</div>
                    <CardTitle className="text-lg">{stream.name}</CardTitle>
                  </div>
                  <Badge variant="outline">{stream.percentage}%</Badge>
                </div>
                <CardDescription>{stream.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Revenue Contribution</span>
                    <span className="font-medium">{stream.monthlyTarget}/month</span>
                  </div>
                  <Progress value={stream.percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Market Projections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            5-Year Growth Projections
          </CardTitle>
          <CardDescription>Conservative estimates based on market research and comparable platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Year</th>
                  <th className="text-left py-2">Active Users</th>
                  <th className="text-left py-2">Annual Revenue</th>
                  <th className="text-left py-2">Growth Rate</th>
                </tr>
              </thead>
              <tbody>
                {marketProjections.map((projection, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{projection.year}</td>
                    <td className="py-3">{projection.users}</td>
                    <td className="py-3 font-medium text-green-600">{projection.revenue}</td>
                    <td className="py-3">
                      <Badge variant="outline" className="bg-green-50">
                        {projection.growth}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="text-center">
            <Zap className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <CardTitle>Customer Acquisition</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div className="text-2xl font-bold">UGX 25,000</div>
            <p className="text-sm text-muted-foreground">Average cost per customer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Shield className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <CardTitle>Customer Lifetime Value</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div className="text-2xl font-bold">UGX 180,000</div>
            <p className="text-sm text-muted-foreground">Average customer value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <CardTitle>Monthly Churn Rate</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div className="text-2xl font-bold">8%</div>
            <p className="text-sm text-muted-foreground">Target retention rate: 92%</p>
          </CardContent>
        </Card>
      </div>

      {/* Business Model Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Business Model Summary</CardTitle>
          <CardDescription>Key advantages of our freemium subscription model</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Revenue Advantages</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Predictable recurring revenue from subscriptions
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Multiple revenue streams reduce dependency risk
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Scalable model with high profit margins
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Commission-based revenue grows with platform success
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Market Fit</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Freemium model reduces barrier to entry
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Pricing aligned with local purchasing power
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Value proposition clear for each user segment
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Flexible pricing accommodates different needs
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
