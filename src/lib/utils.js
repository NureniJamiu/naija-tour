import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Utility function to check if two arrays have any common elements
const hasCommonElement = (arr1, arr2) => arr1.some(item => arr2.includes(item));

// Function to get recommendations based on user preferences
export const getRecommendations = (destinations, preferences) => {
    const { attractionTypes, activityTypes, regionTypes } = preferences;

    const attractionRecommendations = destinations.filter(dest =>
      hasCommonElement(dest.attractionTypes, attractionTypes)
    );

    const activityRecommendations = destinations.filter(dest =>
      hasCommonElement(dest.activities, activityTypes)
    );

    const regionRecommendations = destinations.filter(dest =>
      regionTypes.includes(dest.region)
    );

    const otherDestinations = destinations.filter(dest =>
      !attractionTypes.includes(dest.attractionType) &&
      !hasCommonElement(dest.activities, activityTypes) &&
      !regionTypes.includes(dest.region)
    );

    return {
      attractionRecommendations,
      activityRecommendations,
      regionRecommendations,
      otherDestinations
    };
  };
