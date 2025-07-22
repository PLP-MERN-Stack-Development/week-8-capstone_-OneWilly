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
    location: number // 1-10
    price: number
    size: number
    features: number
  }
}

interface Property {
  id: string
  title: string
  type: string
  price: number
  location: {
    district: string
    parish?: string
    village?: string
  }
  features: {
    bedrooms?: number
    bathrooms?: number
    size: string
  }
  images: string[]
  description: string
  owner: string
}

interface MatchScore {
  property: Property
  score: number
  reasons: string[]
  breakdown: {
    location: number
    price: number
    features: number
    type: number
  }
}

export class AIPropertyMatcher {
  private calculateLocationScore(
    userLocation: UserPreferences["location"],
    propertyLocation: Property["location"],
    priority: number,
  ): { score: number; reason?: string } {
    let score = 0
    let reason = ""

    // District match (highest priority)
    if (userLocation.districts.includes(propertyLocation.district)) {
      score += 0.8
      reason = `Located in preferred district: ${propertyLocation.district}`
    } else {
      // Check for nearby districts (simplified logic)
      const nearbyDistricts = this.getNearbyDistricts(propertyLocation.district)
      const hasNearbyMatch = userLocation.districts.some((district) => nearbyDistricts.includes(district))
      if (hasNearbyMatch) {
        score += 0.4
        reason = `Located near preferred areas`
      }
    }

    // Parish match (if specified)
    if (userLocation.parishes && propertyLocation.parish) {
      if (userLocation.parishes.includes(propertyLocation.parish)) {
        score += 0.2
        reason += reason ? ` and in preferred parish` : `In preferred parish`
      }
    }

    return { score: Math.min((score * priority) / 10, 1), reason }
  }

  private calculatePriceScore(
    userBudget: UserPreferences["budget"],
    propertyPrice: number,
    priority: number,
  ): { score: number; reason?: string } {
    let score = 0
    let reason = ""

    if (propertyPrice >= userBudget.min && propertyPrice <= userBudget.max) {
      // Perfect price match
      const budgetRange = userBudget.max - userBudget.min
      const pricePosition = (propertyPrice - userBudget.min) / budgetRange

      // Prefer properties in the middle of budget range
      if (pricePosition >= 0.3 && pricePosition <= 0.7) {
        score = 1.0
        reason = "Perfect price match within your budget"
      } else {
        score = 0.8
        reason = "Within your budget range"
      }
    } else if (propertyPrice < userBudget.min) {
      // Below budget - still good
      const difference = (userBudget.min - propertyPrice) / userBudget.min
      if (difference <= 0.2) {
        score = 0.9
        reason = "Great value - below your budget"
      } else {
        score = 0.6
        reason = "Significantly below budget"
      }
    } else {
      // Above budget - penalize based on how much over
      const difference = (propertyPrice - userBudget.max) / userBudget.max
      if (difference <= 0.1) {
        score = 0.5
        reason = "Slightly above budget but worth considering"
      } else if (difference <= 0.2) {
        score = 0.3
        reason = "Above budget range"
      } else {
        score = 0.1
        reason = "Significantly above budget"
      }
    }

    return { score: (score * priority) / 10, reason }
  }

  private calculateFeaturesScore(
    userFeatures: UserPreferences["features"],
    propertyFeatures: Property["features"],
    priority: number,
  ): { score: number; reason?: string } {
    let score = 0
    let matchCount = 0
    let totalCriteria = 0
    const reasons: string[] = []

    // Bedrooms match
    if (userFeatures.bedrooms && propertyFeatures.bedrooms) {
      totalCriteria++
      if (propertyFeatures.bedrooms >= userFeatures.bedrooms) {
        score += 0.4
        matchCount++
        reasons.push(`${propertyFeatures.bedrooms} bedrooms (meets requirement)`)
      } else {
        reasons.push(`Only ${propertyFeatures.bedrooms} bedrooms (wanted ${userFeatures.bedrooms})`)
      }
    }

    // Bathrooms match
    if (userFeatures.bathrooms && propertyFeatures.bathrooms) {
      totalCriteria++
      if (propertyFeatures.bathrooms >= userFeatures.bathrooms) {
        score += 0.3
        matchCount++
        reasons.push(`${propertyFeatures.bathrooms} bathrooms`)
      }
    }

    // Size match (simplified - assuming size is in acres or sq ft)
    if (userFeatures.minSize && propertyFeatures.size) {
      totalCriteria++
      const sizeValue = this.extractSizeValue(propertyFeatures.size)
      if (sizeValue >= userFeatures.minSize) {
        score += 0.3
        matchCount++
        reasons.push(`${propertyFeatures.size} (meets size requirement)`)
      }
    }

    const finalScore = totalCriteria > 0 ? (score * priority) / 10 : 0.5
    const reason = reasons.length > 0 ? reasons.join(", ") : "Features information available"

    return { score: finalScore, reason }
  }

  private calculateTypeScore(userTypes: string[], propertyType: string): { score: number; reason?: string } {
    if (userTypes.includes(propertyType)) {
      return { score: 1, reason: `Matches preferred type: ${propertyType}` }
    }

    // Check for related types
    const relatedTypes = this.getRelatedPropertyTypes(propertyType)
    const hasRelatedMatch = userTypes.some((type) => relatedTypes.includes(type))

    if (hasRelatedMatch) {
      return { score: 0.6, reason: `Similar to preferred property types` }
    }

    return { score: 0.2, reason: `Different property type: ${propertyType}` }
  }

  public matchProperties(userPreferences: UserPreferences, properties: Property[]): MatchScore[] {
    const matches: MatchScore[] = properties.map((property) => {
      const locationMatch = this.calculateLocationScore(
        userPreferences.location,
        property.location,
        userPreferences.priorities.location,
      )

      const priceMatch = this.calculatePriceScore(
        userPreferences.budget,
        property.price,
        userPreferences.priorities.price,
      )

      const featuresMatch = this.calculateFeaturesScore(
        userPreferences.features,
        property.features,
        userPreferences.priorities.features,
      )

      const typeMatch = this.calculateTypeScore(userPreferences.propertyType, property.type)

      const totalScore =
        locationMatch.score * 0.3 + priceMatch.score * 0.3 + featuresMatch.score * 0.25 + typeMatch.score * 0.15

      const reasons = [locationMatch.reason, priceMatch.reason, featuresMatch.reason, typeMatch.reason].filter(
        Boolean,
      ) as string[]

      return {
        property,
        score: Math.round(totalScore * 100) / 100,
        reasons,
        breakdown: {
          location: Math.round(locationMatch.score * 100) / 100,
          price: Math.round(priceMatch.score * 100) / 100,
          features: Math.round(featuresMatch.score * 100) / 100,
          type: Math.round(typeMatch.score * 100) / 100,
        },
      }
    })

    // Sort by score (highest first) and return top matches
    return matches.sort((a, b) => b.score - a.score).filter((match) => match.score > 0.3) // Only return decent matches
  }

  private getNearbyDistricts(district: string): string[] {
    // Simplified mapping of nearby districts in Uganda
    const districtMap: Record<string, string[]> = {
      Kampala: ["Wakiso", "Mukono", "Mpigi"],
      Wakiso: ["Kampala", "Mukono", "Mpigi", "Mityana"],
      Mukono: ["Kampala", "Wakiso", "Jinja", "Kayunga"],
      Entebbe: ["Wakiso", "Kampala", "Mpigi"],
      Jinja: ["Mukono", "Kamuli", "Iganga"],
      // Add more districts as needed
    }

    return districtMap[district] || []
  }

  private getRelatedPropertyTypes(type: string): string[] {
    const typeMap: Record<string, string[]> = {
      house: ["rental", "commercial"],
      rental: ["house", "commercial"],
      land: ["commercial"],
      commercial: ["house", "rental", "land"],
    }

    return typeMap[type] || []
  }

  private extractSizeValue(sizeString: string): number {
    // Extract numeric value from size string (e.g., "2.5 acres" -> 2.5)
    const match = sizeString.match(/(\d+\.?\d*)/)
    return match ? Number.parseFloat(match[1]) : 0
  }
}

export const aiMatcher = new AIPropertyMatcher()
