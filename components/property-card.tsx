import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Eye, Heart, Calendar } from "lucide-react"
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
  createdAt: string
}

interface PropertyCardProps {
  property: Property
  viewMode: "grid" | "list" | "map"
}

export function PropertyCard({ property, viewMode }: PropertyCardProps) {
  const formatPrice = (price: number, type: string) => {
    const formatted = new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
    }).format(price)

    return type === "rental" ? `${formatted}/month` : formatted
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-UG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="w-1/3 relative">
            <img
              src={property.images[0] || "/placeholder.svg"}
              alt={property.title}
              className="w-full h-48 object-cover rounded-l-lg"
            />
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="bg-blue-600 text-white">
                {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="w-2/3 p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-xl">{property.title}</h3>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                {property.location.district}
                {property.location.parish && `, ${property.location.parish}`}
              </span>
            </div>

            <div className="text-2xl font-bold text-blue-600 mb-3">{formatPrice(property.price, property.type)}</div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {property.features.bedrooms && (
                  <>
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.features.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.features.bathrooms}
                    </div>
                  </>
                )}
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  {property.features.size}
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {property.views}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(property.createdAt)}
                </div>
              </div>

              <Link href={`/properties/${property.id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">View Details</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow">
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
          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
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

        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          Listed {formatDate(property.createdAt)}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Link href={`/properties/${property.id}`} className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
