"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Users,
  Home,
  GraduationCap,
  TrendingUp,
  MapPin,
  Briefcase,
  Lightbulb,
  Target,
  Globe,
} from "lucide-react"

interface ImpactMetricProps {
  title: string
  current: string
  target: string
  description: string
  progress: number
  icon: React.ReactNode
  color: "blue" | "green" | "purple" | "orange"
}

function ImpactMetric({ title, current, target, description, progress, icon, color }: ImpactMetricProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  }

  return (
    <Card className={`${colorClasses[color]} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white rounded-lg">{icon}</div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm">
            {current} / {target}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="text-xs text-muted-foreground">{progress}% of target achieved</div>
      </CardContent>
    </Card>
  )
}

export function SocialImpact() {
  const impactMetrics: ImpactMetricProps[] = [
    {
      title: "Housing Access Improved",
      current: "2,500",
      target: "10,000",
      description: "Families with better access to housing information",
      progress: 25,
      icon: <Home className="h-5 w-5" />,
      color: "blue",
    },
    {
      title: "Local Brokers Empowered",
      current: "156",
      target: "500",
      description: "Traditional brokers with digital presence",
      progress: 31,
      icon: <Briefcase className="h-5 w-5" />,
      color: "green",
    },
    {
      title: "Digital Literacy Growth",
      current: "3,200",
      target: "15,000",
      description: "Users learning digital property search",
      progress: 21,
      icon: <GraduationCap className="h-5 w-5" />,
      color: "purple",
    },
    {
      title: "Economic Opportunities",
      current: "45",
      target: "200",
      description: "New jobs created in real estate sector",
      progress: 23,
      icon: <TrendingUp className="h-5 w-5" />,
      color: "orange",
    },
  ]

  const communityBenefits = [
    {
      category: "Housing Accessibility",
      icon: <Home className="h-6 w-6" />,
      benefits: [
        "Democratized access to property information",
        "Reduced information asymmetry in housing market",
        "Better matching of families to suitable homes",
        "Transparent pricing and property details",
      ],
    },
    {
      category: "Economic Empowerment",
      icon: <Briefcase className="h-6 w-6" />,
      benefits: [
        "Digital transformation of traditional brokers",
        "New income streams for property professionals",
        "Reduced transaction costs and time",
        "Increased property market efficiency",
      ],
    },
    {
      category: "Technology Adoption",
      icon: <Lightbulb className="h-6 w-6" />,
      benefits: [
        "Promoting smartphone and internet usage",
        "Building digital literacy in real estate",
        "Encouraging online business practices",
        "Bridging urban-rural digital divide",
      ],
    },
    {
      category: "Urban Development",
      icon: <MapPin className="h-6 w-6" />,
      benefits: [
        "Supporting planned urban growth in Gulu",
        "Better property data for city planning",
        "Encouraging investment in Northern Uganda",
        "Promoting sustainable development practices",
      ],
    },
  ]

  const sdgAlignment = [
    {
      goal: "SDG 1: No Poverty",
      description: "Improving access to affordable housing information",
      alignment: "High",
      color: "red",
    },
    {
      goal: "SDG 8: Decent Work",
      description: "Creating digital economy jobs for brokers",
      alignment: "High",
      color: "purple",
    },
    {
      goal: "SDG 9: Innovation",
      description: "Building digital infrastructure for real estate",
      alignment: "High",
      color: "orange",
    },
    {
      goal: "SDG 11: Sustainable Cities",
      description: "Supporting planned urban development",
      alignment: "Medium",
      color: "green",
    },
    {
      goal: "SDG 17: Partnerships",
      description: "Connecting stakeholders in property ecosystem",
      alignment: "Medium",
      color: "blue",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Social Impact & Community Benefits</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Empowering Northern Uganda communities through technology-driven real estate solutions
        </p>
      </div>

      {/* Impact Metrics */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Impact Metrics</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {impactMetrics.map((metric, index) => (
            <ImpactMetric key={index} {...metric} />
          ))}
        </div>
      </div>

      {/* Community Benefits */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Community Benefits</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {communityBenefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">{benefit.icon}</div>
                  <CardTitle className="text-xl">{benefit.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {benefit.benefits.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* UN SDG Alignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Globe className="h-5 w-5 mr-2 text-blue-600" />
            UN Sustainable Development Goals Alignment
          </CardTitle>
          <CardDescription>How Broka256 contributes to global sustainability objectives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sdgAlignment.map((sdg, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{sdg.goal}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{sdg.description}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`ml-4 ${
                    sdg.alignment === "High"
                      ? "bg-green-100 text-green-800 border-green-300"
                      : "bg-yellow-100 text-yellow-800 border-yellow-300"
                  }`}
                >
                  {sdg.alignment} Impact
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Long-term Vision */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2 text-purple-600" />
            Long-term Social Vision
          </CardTitle>
          <CardDescription>Our commitment to transforming Northern Uganda's real estate landscape</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center space-y-3">
              <div className="p-4 bg-blue-100 rounded-full w-fit mx-auto">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold">Community Empowerment</h3>
              <p className="text-sm text-muted-foreground">
                Building a digitally literate community where everyone has equal access to housing opportunities
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="p-4 bg-green-100 rounded-full w-fit mx-auto">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold">Economic Growth</h3>
              <p className="text-sm text-muted-foreground">
                Catalyzing economic development through technology adoption and market efficiency
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="p-4 bg-purple-100 rounded-full w-fit mx-auto">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold">Social Equity</h3>
              <p className="text-sm text-muted-foreground">
                Ensuring fair access to housing information regardless of socioeconomic background
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
