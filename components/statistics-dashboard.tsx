"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Home, MapPin, Star, DollarSign } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  trend?: number
  color?: "default" | "success" | "warning" | "destructive"
}

function StatCard({ title, value, description, icon, trend, color = "default" }: StatCardProps) {
  const colorClasses = {
    default: "border-blue-200 bg-blue-50",
    success: "border-green-200 bg-green-50",
    warning: "border-yellow-200 bg-yellow-50",
    destructive: "border-red-200 bg-red-50",
  }

  return (
    <Card className={`${colorClasses[color]} transition-all hover:shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">+{trend}% from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function StatisticsDashboard() {
  const marketStats = [
    {
      title: "Northern Uganda Population",
      value: "2.1M",
      description: "Total population in target region",
      icon: <Users className="h-4 w-4" />,
      color: "default" as const,
    },
    {
      title: "Urban Growth Rate",
      value: "15%",
      description: "Annual urban development growth",
      icon: <TrendingUp className="h-4 w-4" />,
      trend: 3,
      color: "success" as const,
    },
    {
      title: "Real Estate Market Value",
      value: "$2.5B",
      description: "Total market value in Northern Uganda",
      icon: <DollarSign className="h-4 w-4" />,
      color: "default" as const,
    },
    {
      title: "Mobile Internet Penetration",
      value: "68%",
      description: "Population with mobile internet access",
      icon: <MapPin className="h-4 w-4" />,
      trend: 12,
      color: "success" as const,
    },
  ]

  const platformStats = [
    {
      title: "Properties Listed",
      value: "1,247",
      description: "Total properties on platform",
      icon: <Home className="h-4 w-4" />,
      trend: 23,
      color: "success" as const,
    },
    {
      title: "Active Users",
      value: "3,456",
      description: "Monthly active users",
      icon: <Users className="h-4 w-4" />,
      trend: 18,
      color: "success" as const,
    },
    {
      title: "Successful Matches",
      value: "892",
      description: "AI-powered property matches",
      icon: <Star className="h-4 w-4" />,
      trend: 31,
      color: "success" as const,
    },
    {
      title: "Broker Partners",
      value: "156",
      description: "Verified real estate brokers",
      icon: <MapPin className="h-4 w-4" />,
      trend: 45,
      color: "success" as const,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Market Statistics */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Market Analysis</h2>
            <p className="text-muted-foreground">Northern Uganda real estate market insights</p>
          </div>
          <Badge variant="outline" className="bg-blue-50">
            Market Research
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {marketStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Platform Statistics */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Platform Performance</h2>
            <p className="text-muted-foreground">Broka256 platform metrics and growth</p>
          </div>
          <Badge variant="outline" className="bg-green-50">
            Live Data
          </Badge>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {platformStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>

      {/* Growth Metrics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Growth Trajectory</CardTitle>
            <CardDescription>Monthly user acquisition and retention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>New Users</span>
                <span>1,234 this month</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>User Retention</span>
                <span>85% monthly retention</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Premium Conversions</span>
                <span>12% conversion rate</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Coverage</CardTitle>
            <CardDescription>Property listings across Northern Uganda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Gulu District</span>
                <span>456 properties</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Lira District</span>
                <span>234 properties</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Arua District</span>
                <span>189 properties</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Other Areas</span>
                <span>368 properties</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
