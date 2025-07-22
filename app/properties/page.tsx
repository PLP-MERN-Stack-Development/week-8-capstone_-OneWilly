"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertyCard } from "@/components/property-card"
import { PropertyFilters } from "@/components/property-filters"
import { Button } from "@/components/ui/button"
import { Grid, List, Map } from "lucide-react"

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
  createdAt: string
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [filters, setFilters] = useState({
    type: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
  })

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
        createdAt: "2024-01-15",
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
        createdAt: "2024-01-14",
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
        createdAt: "2024-01-13",
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
        createdAt: "2024-01-12",
      },
      {
        id: "5",
        title: "Executive Bungalow in Muyenga",
        price: 650000000,
        location: { district: "Kampala", parish: "Muyenga" },
        type: "house",
        features: { bedrooms: 5, bathrooms: 4, size: "3000 sq ft" },
        images: ["/placeholder.svg?height=300&width=400"],
        views: 312,
        status: "active",
        createdAt: "2024-01-11",
      },
      {
        id: "6",
        title: "Commercial Building in Jinja",
        price: 1200000000,
        location: { district: "Jinja", parish: "Central" },
        type: "commercial",
        features: { size: "5000 sq ft" },
        images: ["/placeholder.svg?height=300&width=400"],
        views: 87,
        status: "active",
        createdAt: "2024-01-10",
      },
    ]

    setTimeout(() => {
      setProperties(mockProperties)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredProperties = properties.filter((property) => {
    if (filters.type && property.type !== filters.type) return false
    if (filters.location && !property.location.district.toLowerCase().includes(filters.location.toLowerCase()))
      return false
    if (filters.minPrice && property.price < Number.parseInt(filters.minPrice)) return false
    if (filters.maxPrice && property.price > Number.parseInt(filters.maxPrice)) return false
    if (filters.bedrooms && property.features.bedrooms !== Number.parseInt(filters.bedrooms)) return false
    if (filters.bathrooms && property.features.bathrooms !== Number.parseInt(filters.bathrooms)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <PropertyFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
                <p className="text-gray-600">{filteredProperties.length} properties found</p>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Properties Grid/List */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow animate-pulse">
                    <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
              >
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} viewMode={viewMode} />
                ))}
              </div>
            )}

            {filteredProperties.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4 bg-transparent"
                  onClick={() =>
                    setFilters({
                      type: "",
                      location: "",
                      minPrice: "",
                      maxPrice: "",
                      bedrooms: "",
                      bathrooms: "",
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
