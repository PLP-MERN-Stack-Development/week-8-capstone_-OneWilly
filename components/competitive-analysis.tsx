"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  MapPin,
  MessageSquare,
  Smartphone,
  Brain,
  Shield,
  Zap,
} from "lucide-react"

interface CompetitorProps {
  name: string
  description: string
  strengths: string[]
  weaknesses: string[]
  marketShare: number
  rating: number
  focus: string
  status: "active" | "limited" | "inactive"
}

function CompetitorCard({
  name,
  description,
  strengths,
  weaknesses,
  marketShare,
  rating,
  focus,
  status,
}: CompetitorProps) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    limited: "bg-yellow-100 text-yellow-800",
    inactive: "bg-red-100 text-red-800",
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge className={statusColors[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>{rating}/5</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{focus}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Market Share</span>
            <span>{marketShare}%</span>
          </div>
          <Progress value={marketShare} className="h-2" />
        </div>

        <div>
          <h4 className="font-medium text-green-700 mb-2 flex items-center">
            <CheckCircle className="h-4 w-4 mr-1" />
            Strengths
          </h4>
          <ul className="text-sm space-y-1">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-red-700 mb-2 flex items-center">
            <XCircle className="h-4 w-4 mr-1" />
            Weaknesses
          </h4>
          <ul className="text-sm space-y-1">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export function CompetitiveAnalysis() {
  const competitors: CompetitorProps[] = [
    {
      name: "Lamudi Uganda",
      description: "International property portal with Uganda presence",
      strengths: [
        "Established brand recognition",
        "International backing",
        "Professional website design",
        "Multiple property types",
      ],
      weaknesses: [
        "Limited Northern Uganda coverage",
        "No AI matching features",
        "Generic approach, not localized",
        "High listing fees for brokers",
      ],
      marketShare: 35,
      rating: 3.2,
      focus: "Kampala & Central",
      status: "active",
    },
    {
      name: "Meqasa",
      description: "Local Ugandan property platform",
      strengths: [
        "Local market knowledge",
        "Established user base",
        "Mobile app available",
        "Local payment integration",
      ],
      weaknesses: [
        "Outdated user interface",
        "Limited search functionality",
        "No real-time communication",
        "Minimal Northern Uganda presence",
      ],
      marketShare: 25,
      rating: 2.8,
      focus: "Kampala Metro",
      status: "active",
    },
    {
      name: "Traditional Brokers",
      description: "Local real estate agents and brokers",
      strengths: [
        "Deep local relationships",
        "Personal trust and credibility",
        "Flexible negotiation",
        "Local market expertise",
      ],
      weaknesses: [
        "No digital presence",
        "Limited reach and scale",
        "Inefficient processes",
        "No standardized information",
      ],
      marketShare: 40,
      rating: 3.5,
      focus: "Local Markets",
      status: "active",
    },
  ]

  const ourAdvantages = [
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI-Powered Matching",
      description: "Advanced algorithms for personalized property recommendations",
      status: "unique",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Northern Uganda Focus",
      description: "Specifically designed for Gulu and surrounding regions",
      status: "unique",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Real-time Communication",
      description: "Instant chat and notifications via Socket.io",
      status: "unique",
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: "Mobile-First Design",
      description: "Optimized for African mobile internet usage patterns",
      status: "advantage",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Verified Listings",
      description: "Quality assurance and broker verification system",
      status: "advantage",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Modern Tech Stack",
      description: "Built with Next.js, React, and modern web technologies",
      status: "advantage",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Competitive Analysis</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Understanding the competitive landscape in Uganda's real estate market and how Broka256 differentiates itself
        </p>
      </div>

      {/* Market Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Market Landscape Overview</CardTitle>
          <CardDescription>Current state of digital real estate platforms in Uganda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">78%</div>
              <div className="text-sm text-muted-foreground">Properties not listed online</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-muted-foreground">Major digital platforms</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">15%</div>
              <div className="text-sm text-muted-foreground">Northern Uganda coverage</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Competitor Analysis */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Competitor Analysis</h2>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {competitors.map((competitor, index) => (
            <CompetitorCard key={index} {...competitor} />
          ))}
        </div>
      </div>

      {/* Our Competitive Advantages */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Broka256 Competitive Advantages</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ourAdvantages.map((advantage, index) => (
            <Card key={index} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{advantage.icon}</div>
                  <div>
                    <CardTitle className="text-base">{advantage.title}</CardTitle>
                    {advantage.status === "unique" && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        Unique
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Market Opportunity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
            Market Opportunity
          </CardTitle>
          <CardDescription>Key insights and opportunities in the Northern Uganda market</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Market Gaps</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  No AI-powered property matching in Uganda
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Limited focus on Northern Uganda region
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Lack of real-time communication features
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Poor mobile optimization for local users
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Our Solution</h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Advanced AI matching algorithms
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Dedicated Northern Uganda platform
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Socket.io powered real-time chat
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Mobile-first responsive design
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t">
            <Button className="w-full md:w-auto">View Detailed Market Analysis</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
