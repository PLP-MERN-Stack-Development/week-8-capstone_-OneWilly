"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, MapPin, DollarSign, Home, Star, TrendingUp } from "lucide-react"
import { aiMatcher } from "@/lib/ai-matching"

interface UserPreferences {
  budget: {
    min: number
    max: number
  }
  propertyType: string[]
  location: {
    districts: string[]
    parishes?: string[]
  }
  features: {
    bedrooms?: number
    bathrooms?: number
    minSize?: number
  }
  priorities: {
    location: number
    price: number
    size: number
    features: number
  }
}

const UGANDA_DISTRICTS = [
  "Kampala",
  "Wakiso",
  "Mukono",
  "Entebbe",
  "Jinja",
  "Mbarara",
  "Gulu",
  "Lira",
  "Masaka",
  "Kasese",
  "Mbale",
  "Soroti",
  "Arua",
  "Kitgum",
  "Moroto",
]

const PROPERTY_TYPES = [
  { value: "land", label: "Land" },
  { value: "house", label: "House" },
  { value: "rental", label: "Rental" },
  { value: "commercial", label: "Commercial" },
]

export function AIPropertyMatcher() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    budget: { min: 10000000, max: 100000000 }, // 10M - 100M UGX
    propertyType: ["house"],
    location: { districts: ["Kampala"] },
    features: { bedrooms: 2, bathrooms: 1, minSize: 1 },
    priorities: { location: 8, price: 7, size: 6, features: 5 },
  })

  const [matches, setMatches] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("preferences")

  // Mock properties data - in real app, this would come from your API
  const mockProperties = [
    {
      id: "1",
      title: "Modern 3-Bedroom House in Kampala",
      type: "house",
      price: 45000000,
      location: { district: "Kampala", parish: "Nakawa", village: "Bugolobi" },
      features: { bedrooms: 3, bathrooms: 2, size: "0.5 acres" },
      images: ["/placeholder.jpg"],
      description: "Beautiful modern house with garden",
      owner: "user1",
    },
    {
      id: "2",
      title: "Prime Land in Wakiso",
      type: "land",
      price: 25000000,
      location: { district: "Wakiso", parish: "Kira", village: "Kira Town" },
      features: { size: "2 acres" },
      images: ["/placeholder.jpg"],
      description: "Perfect for development",
      owner: "user2",
    },
    {
      id: "3",
      title: "Luxury Villa in Entebbe",
      type: "house",
      price: 85000000,
      location: { district: "Entebbe", parish: "Entebbe Municipality" },
      features: { bedrooms: 4, bathrooms: 3, size: "1 acre" },
      images: ["/placeholder.jpg"],
      description: "Waterfront property with amazing views",
      owner: "user3",
    },
  ]

  const handleFindMatches = async () => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const matchResults = aiMatcher.matchProperties(preferences, mockProperties)
    setMatches(matchResults)
    setActiveTab("results")
    setIsLoading(false)
  }

  const updatePreference = (key: string, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const updateNestedPreference = (parent: string, key: string, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof UserPreferences],
        [key]: value,
      },
    }))
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Brain className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold">AI Property Matcher</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Let our AI help you find the perfect property based on your preferences and priorities. Get personalized
          recommendations with detailed match scores.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preferences">Set Preferences</TabsTrigger>
          <TabsTrigger value="results">AI Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Budget Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Budget Range
                </CardTitle>
                <CardDescription>Set your minimum and maximum budget in UGX</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Minimum Budget: {preferences.budget.min.toLocaleString()} UGX</Label>
                  <Slider
                    value={[preferences.budget.min]}
                    onValueChange={([value]) => updateNestedPreference("budget", "min", value)}
                    max={200000000}
                    min={5000000}
                    step={5000000}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Maximum Budget: {preferences.budget.max.toLocaleString()} UGX</Label>
                  <Slider
                    value={[preferences.budget.max]}
                    onValueChange={([value]) => updateNestedPreference("budget", "max", value)}
                    max={500000000}
                    min={preferences.budget.min}
                    step={10000000}
                    className="mt-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Preferred Locations
                </CardTitle>
                <CardDescription>Select districts you're interested in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {UGANDA_DISTRICTS.map((district) => (
                    <div key={district} className="flex items-center space-x-2">
                      <Checkbox
                        id={district}
                        checked={preferences.location.districts.includes(district)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateNestedPreference("location", "districts", [
                              ...preferences.location.districts,
                              district,
                            ])
                          } else {
                            updateNestedPreference(
                              "location",
                              "districts",
                              preferences.location.districts.filter((d) => d !== district),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={district} className="text-sm">
                        {district}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Property Type Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Property Types
                </CardTitle>
                <CardDescription>What type of properties are you looking for?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {PROPERTY_TYPES.map((type) => (
                    <div key={type.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={type.value}
                        checked={preferences.propertyType.includes(type.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updatePreference("propertyType", [...preferences.propertyType, type.value])
                          } else {
                            updatePreference(
                              "propertyType",
                              preferences.propertyType.filter((t) => t !== type.value),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={type.value}>{type.label}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features Section */}
            <Card>
              <CardHeader>
                <CardTitle>Property Features</CardTitle>
                <CardDescription>Specify your requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Minimum Bedrooms</Label>
                    <Input
                      type="number"
                      value={preferences.features.bedrooms || ""}
                      onChange={(e) =>
                        updateNestedPreference("features", "bedrooms", Number.parseInt(e.target.value) || 0)
                      }
                      min="1"
                      max="10"
                    />
                  </div>
                  <div>
                    <Label>Minimum Bathrooms</Label>
                    <Input
                      type="number"
                      value={preferences.features.bathrooms || ""}
                      onChange={(e) =>
                        updateNestedPreference("features", "bathrooms", Number.parseInt(e.target.value) || 0)
                      }
                      min="1"
                      max="10"
                    />
                  </div>
                </div>
                <div>
                  <Label>Minimum Size (acres)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={preferences.features.minSize || ""}
                    onChange={(e) =>
                      updateNestedPreference("features", "minSize", Number.parseFloat(e.target.value) || 0)
                    }
                    min="0.1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Priorities Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Your Priorities
              </CardTitle>
              <CardDescription>Rate how important each factor is to you (1-10 scale)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(preferences.priorities).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label className="capitalize">
                      {key}: {value}/10
                    </Label>
                    <Slider
                      value={[value]}
                      onValueChange={([newValue]) => updateNestedPreference("priorities", key, newValue)}
                      max={10}
                      min={1}
                      step={1}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={handleFindMatches}
              disabled={isLoading}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-spin" />
                  Finding Perfect Matches...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Find My Perfect Properties
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {matches.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Matches Yet</h3>
                <p className="text-gray-600 mb-4">
                  Set your preferences and click "Find My Perfect Properties" to see AI-powered recommendations.
                </p>
                <Button onClick={() => setActiveTab("preferences")}>Set Preferences</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Found {matches.length} Perfect Matches</h2>
                <p className="text-gray-600">Properties ranked by AI compatibility with your preferences</p>
              </div>

              <div className="space-y-6">
                {matches.map((match, index) => (
                  <Card key={match.property.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col lg:flex-row">
                        {/* Property Image */}
                        <div className="lg:w-1/3">
                          <img
                            src={match.property.images[0] || "/placeholder.svg"}
                            alt={match.property.title}
                            className="w-full h-48 lg:h-full object-cover"
                          />
                        </div>

                        {/* Property Details */}
                        <div className="lg:w-2/3 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">#{index + 1} Match</Badge>
                                <Badge
                                  variant={
                                    match.score >= 0.8 ? "default" : match.score >= 0.6 ? "secondary" : "outline"
                                  }
                                  className="flex items-center gap-1"
                                >
                                  <Star className="h-3 w-3" />
                                  {Math.round(match.score * 100)}% Match
                                </Badge>
                              </div>
                              <h3 className="text-xl font-bold mb-1">{match.property.title}</h3>
                              <p className="text-gray-600 mb-2">
                                {match.property.location.district}
                                {match.property.location.parish && `, ${match.property.location.parish}`}
                              </p>
                              <p className="text-2xl font-bold text-blue-600">
                                {match.property.price.toLocaleString()} UGX
                              </p>
                            </div>
                          </div>

                          {/* Match Breakdown */}
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Match Breakdown:</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Location</span>
                                  <span>{Math.round(match.breakdown.location * 100)}%</span>
                                </div>
                                <Progress value={match.breakdown.location * 100} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Price</span>
                                  <span>{Math.round(match.breakdown.price * 100)}%</span>
                                </div>
                                <Progress value={match.breakdown.price * 100} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Features</span>
                                  <span>{Math.round(match.breakdown.features * 100)}%</span>
                                </div>
                                <Progress value={match.breakdown.features * 100} className="h-2" />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Type</span>
                                  <span>{Math.round(match.breakdown.type * 100)}%</span>
                                </div>
                                <Progress value={match.breakdown.type * 100} className="h-2" />
                              </div>
                            </div>
                          </div>

                          {/* Why This Matches */}
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Why This Property Matches:</h4>
                            <ul className="space-y-1">
                              {match.reasons.map((reason: string, idx: number) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-green-500 mt-1">•</span>
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Property Features */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline">{match.property.type}</Badge>
                            {match.property.features.bedrooms && (
                              <Badge variant="outline">{match.property.features.bedrooms} beds</Badge>
                            )}
                            {match.property.features.bathrooms && (
                              <Badge variant="outline">{match.property.features.bathrooms} baths</Badge>
                            )}
                            {match.property.features.size && (
                              <Badge variant="outline">{match.property.features.size}</Badge>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Button className="flex-1">View Details</Button>
                            <Button variant="outline">Contact Owner</Button>
                            <Button variant="outline">Save Property</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
