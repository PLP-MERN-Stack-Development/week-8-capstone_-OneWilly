"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Eye, Heart } from "lucide-react"
import Link from "next/link"

interface Property {
  id: string
  title: string
  price: number
  location: {
    district: string
    parish?: string
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
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for demonstration
    const mockProperties: Property[] = [
      {
        id: "1",
        title: "Modern 4-Bedroom House in Kampala",
        price: 450000000,
        location: { district: "Kampala", parish: "Nakawa" },
        type: "house",
        features: { bedrooms: 4, bathrooms: 3, size: "2000 sq ft" },
        images: ["/placeholder.svg?height=300&width=400"],
        views: 245,
        status: "active",
      },
      {
        id: "2",
        title: "Prime Commercial Land in Entebbe",
        price: 800000000,
        location: { district: "Wakiso", parish: "Entebbe" },
        type: "land",
        features: { size: "5 acres" },
        images: ["/placeholder.svg?height=300&width=400"],
        views: 189,
        status: "active",
      },
      {
        id: "3",
        title: "Luxury Apartment for Rent",
        price: 2500000,
        location: { district: "Kampala", parish: "Kololo" },
        type: "rental",
        features: { bedrooms: 3, bathrooms: 2, size: "1500 sq ft" },
        images: ["/placeholder.svg?height=300&width=400"],
        views: 156,
        status: "active",
      },
      {
        id: "4",
        title: "Residential Plot in Mukono",
        price: 120000000,
        location: { district: "Mukono", parish: "Seeta" },
        type: "land",
        features: { size: "50x100 ft" },
        images: ["/placeholder.svg?height=300&width=400"],
        views: 98,
        status: "active",
      },
    ]

    setTimeout(() => {
      setProperties(mockProperties)
      setLoading(false)
    }, 1000)
  }, [])

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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
          <p className="text-lg text-gray-600">Discover our handpicked selection of premium properties</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <Card key={property.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-blue-600 text-white">
                    {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center text-white text-sm bg-black/50 px-2 py-1 rounded">
                  <Eye className="h-3 w-3 mr-1" />
                  {property.views}
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.location.district}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(property.price, property.type)}</span>
                </div>

                {property.features.bedrooms && (
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.features.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.features.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.features.size}
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Link href={`/properties/${property.id}`} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/properties">
            <Button variant="outline" size="lg">
              View All Properties
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
