"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface Filters {
  type: string
  location: string
  minPrice: string
  maxPrice: string
  bedrooms: string
  bathrooms: string
}

interface PropertyFiltersProps {
  filters: Filters
  onFiltersChange: (filters: Filters) => void
}

export function PropertyFilters({ filters, onFiltersChange }: PropertyFiltersProps) {
  const updateFilter = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    onFiltersChange({
      type: "",
      location: "",
      minPrice: "",
      maxPrice: "",
      bedrooms: "",
      bathrooms: "",
    })
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Filters
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Property Type */}
        <div>
          <Label htmlFor="type">Property Type</Label>
          <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="land">Land</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="rental">Rental</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location">Location</Label>
          <Select value={filters.location} onValueChange={(value) => updateFilter("location", value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="kampala">Kampala</SelectItem>
              <SelectItem value="wakiso">Wakiso</SelectItem>
              <SelectItem value="mukono">Mukono</SelectItem>
              <SelectItem value="jinja">Jinja</SelectItem>
              <SelectItem value="entebbe">Entebbe</SelectItem>
              <SelectItem value="mbarara">Mbarara</SelectItem>
              <SelectItem value="gulu">Gulu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label>Price Range (UGX)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min Price"
              type="number"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
            />
            <Input
              placeholder="Max Price"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Select value={filters.bedrooms} onValueChange={(value) => updateFilter("bedrooms", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms */}
        <div>
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Select value={filters.bathrooms} onValueChange={(value) => updateFilter("bathrooms", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
