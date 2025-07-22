"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Brain, TrendingUp } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect Property in <span className="text-blue-600">Uganda</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover land, houses, and commercial properties with our AI-powered matching system. Connect directly
              with verified owners and brokers.
            </p>
          </div>

          {/* AI Matcher CTA */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-blue-100">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Try Our AI Property Matcher</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Let AI find properties that perfectly match your preferences, budget, and priorities
            </p>
            <Link href="/ai-matcher">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Brain className="mr-2 h-5 w-5" />
                Find My Perfect Property
              </Button>
            </Link>
          </div>

          {/* Quick Search */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <h3 className="text-lg font-semibold mb-4">Quick Property Search</h3>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search by location, property type..." className="h-12" />
              </div>
              <Select>
                <SelectTrigger className="lg:w-48 h-12">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="land">Land</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="rental">Rental</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="lg:w-48 h-12">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kampala">Kampala</SelectItem>
                  <SelectItem value="wakiso">Wakiso</SelectItem>
                  <SelectItem value="mukono">Mukono</SelectItem>
                  <SelectItem value="entebbe">Entebbe</SelectItem>
                </SelectContent>
              </Select>
              <Button size="lg" className="lg:w-32 h-12 bg-blue-600 hover:bg-blue-700">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-gray-600">
                Smart algorithms find properties that match your exact preferences and budget
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Locations</h3>
              <p className="text-gray-600">All properties are verified with accurate location data and documentation</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Market Insights</h3>
              <p className="text-gray-600">Get real-time market data and price trends for informed decisions</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
