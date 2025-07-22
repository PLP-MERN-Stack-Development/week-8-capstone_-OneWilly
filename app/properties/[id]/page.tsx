"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LiveChat } from "@/components/live-chat"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Eye,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  Shield,
  MessageCircle,
} from "lucide-react"
import { useAuth } from "@/components/providers"

interface Property {
  id: string
  title: string
  description: string
  price: number
  location: {
    district: string
    parish?: string
    village?: string
    coordinates?: { lat: number; lng: number }
  }
  type: string
  features: {
    bedrooms?: number
    bathrooms?: number
    size: string
  }
  images: string[]
  views: number
  status: string
  verificationStatus: string
  owner: {
    id: string
    name: string
    phone: string
    email: string
    avatar?: string
  }
  createdAt: string
}

export default function PropertyDetailPage() {
  const params = useParams()
  const { user } = useAuth()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    // Mock data for demonstration
    const mockProperty: Property = {
      id: params.id as string,
      title: "Modern 4-Bedroom House in Kampala",
      description: `This stunning modern house offers the perfect blend of comfort and style. Located in the heart of Nakawa, this property features spacious rooms, modern finishes, and a beautiful garden. The house is situated in a quiet neighborhood with easy access to schools, hospitals, and shopping centers.

Key features include:
- Spacious living and dining areas
- Modern kitchen with built-in appliances
- Master bedroom with en-suite bathroom
- Private garden and parking space
- 24/7 security in the neighborhood
- Close to public transportation

This is an ideal family home or investment property. The area is rapidly developing with good infrastructure and amenities nearby.`,
      price: 450000000,
      location: {
        district: "Kampala",
        parish: "Nakawa",
        village: "Bugolobi",
        coordinates: { lat: 0.3476, lng: 32.6204 },
      },
      type: "house",
      features: { bedrooms: 4, bathrooms: 3, size: "2000 sq ft" },
      images: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
      views: 245,
      status: "active",
      verificationStatus: "approved",
      owner: {
        id: "owner1",
        name: "John Mukasa",
        phone: "+256 700 123 456",
        email: "john.mukasa@email.com",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      createdAt: "2024-01-15",
    }

    setTimeout(() => {
      setProperty(mockProperty)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const formatPrice = (price: number, type: string) => {
    const formatted = new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
    }).format(price)

    return type === "rental" ? `${formatted}/month` : formatted
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
              <div className="h-64 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={property.images[currentImageIndex] || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-blue-600 text-white">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            {property.verificationStatus === "approved" && (
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-green-600 text-white">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  currentImageIndex === index ? "border-blue-600" : "border-gray-200"
                }`}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>
                      {property.location.district}
                      {property.location.parish && `, ${property.location.parish}`}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{property.views} views</span>
                    <Calendar className="h-4 w-4 ml-4 mr-1" />
                    <span>Listed {new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{formatPrice(property.price, property.type)}</div>
                </div>
              </div>

              {/* Property Features */}
              {property.features.bedrooms && (
                <div className="flex items-center space-x-6 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-semibold">{property.features.bedrooms}</span>
                    <span className="text-gray-600 ml-1">Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-semibold">{property.features.bathrooms}</span>
                    <span className="text-gray-600 ml-1">Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 mr-2 text-gray-600" />
                    <span className="font-semibold">{property.features.size}</span>
                  </div>
                </div>
              )}

              {/* Tabs */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
                  </div>
                </TabsContent>

                <TabsContent value="location" className="mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Address Details</h3>
                      <div className="space-y-1 text-gray-700">
                        <p>
                          <strong>District:</strong> {property.location.district}
                        </p>
                        {property.location.parish && (
                          <p>
                            <strong>Parish:</strong> {property.location.parish}
                          </p>
                        )}
                        {property.location.village && (
                          <p>
                            <strong>Village:</strong> {property.location.village}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Interactive Map Coming Soon</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Property Details</h3>
                      <ul className="space-y-1 text-gray-700">
                        <li>Type: {property.type.charAt(0).toUpperCase() + property.type.slice(1)}</li>
                        <li>Size: {property.features.size}</li>
                        {property.features.bedrooms && <li>Bedrooms: {property.features.bedrooms}</li>}
                        {property.features.bathrooms && <li>Bathrooms: {property.features.bathrooms}</li>}
                        <li>Status: {property.status.charAt(0).toUpperCase() + property.status.slice(1)}</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Verification</h3>
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-green-600" />
                        <span className="text-green-600 font-medium">Property Verified</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <img
                    src={property.owner.avatar || "/placeholder.svg?height=60&width=60&query=user avatar"}
                    alt={property.owner.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{property.owner.name}</h3>
                    <p className="text-sm text-gray-600">Property Owner</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    {property.owner.phone}
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                  {user && user.id !== property.owner.id && (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setShowChat(true)}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Chat
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Live Chat */}
            {showChat && user && user.id !== property.owner.id && (
              <LiveChat propertyId={property.id} ownerId={property.owner.id} onClose={() => setShowChat(false)} />
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline">
                  Schedule Viewing
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  Request Documents
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  Get Financing Info
                </Button>
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex space-x-3">
                      <img
                        src={`/placeholder.svg?height=60&width=80&query=similar property ${i}`}
                        alt={`Similar property ${i}`}
                        className="w-20 h-15 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">Similar Property {i}</h4>
                        <p className="text-xs text-gray-600">Kampala</p>
                        <p className="text-sm font-semibold text-blue-600">UGX 400M</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
