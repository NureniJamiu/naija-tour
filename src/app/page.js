'use client';
import TravelCard from "@/components/TravelCard";
import { destinations } from "@/db/data";
import { getRecommendations } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { fetchUserPreferences } from "./actions/preference";

export default function Home() {
    const { isLoaded, user } = useUser();
    const [userPreferences, setUserPreferences] = useState(null);
    const [recommendations, setRecommendations] = useState(null);

    // Fetch user preferences when user is logged in
    useEffect(() => {
        const getUserPreferences = async () => {
            if (isLoaded && user) {
                const response = await fetchUserPreferences(user.id);

                if (response.success) {
                    setUserPreferences(response.data);
                    const recs = getRecommendations(destinations, response.data);
                    setRecommendations(recs);
                } else {
                    console.error(response.error);
                }
            }
        };
        getUserPreferences();
    }, [isLoaded, user]);

    // Show loading state if the page is still checking authentication state
    if (!isLoaded) return (
        <div className="h-screen flex items-center justify-center">
            <span>Loading...</span>
        </div>
    );

    return (
        <main className="flex min-h-screen flex-col px-24 pt-20 w-full">
          {user && recommendations ? (
            // Display recommendations when the user is logged in and recommendations are available
            <>
              <section className="w-full">
                  <h1 className="text-3xl my-5 border-l-2 border-l-green-600 pl-2 py-1 ml-4">
                      Attractions you might like
                  </h1>
                  <ScrollMenu>
                      {recommendations.attractionRecommendations.map((destination) => (
                      <TravelCard
                          className="w-80 mr-5"
                          itemId={destination.id}
                          key={destination.id}
                          destination={destination}
                      />
                      ))}
                  </ScrollMenu>
              </section>

              <section className="w-full">
                  <h1 className="text-3xl my-5 border-l-2 border-l-green-600 pl-2 py-1 ml-4">
                      Based on your activities of interest
                  </h1>
                  <ScrollMenu>
                      {recommendations.activityRecommendations.map((destination) => (
                      <TravelCard
                          className="w-80 mr-5"
                          itemId={destination.id}
                          key={destination.id}
                          destination={destination}
                      />
                      ))}
                  </ScrollMenu>
              </section>

              <section className="w-full">
                  <h1 className="text-3xl my-5 border-l-2 border-l-green-600 pl-2 py-1 ml-4">
                      Recommendations based on your preferred regions
                  </h1>
                  <ScrollMenu>
                      {recommendations.regionRecommendations.map((destination) => (
                      <TravelCard
                          className="w-80 mr-5"
                          itemId={destination.id}
                          key={destination.id}
                          destination={destination}
                      />
                      ))}
                  </ScrollMenu>
              </section>
            </>
          ) : (
            // Display fallback content for all users or non-signed-in users
            <section>
              <h1 className="text-3xl my-5 border-l-2 border-l-green-600 pl-2 py-1 ml-4">
                All Destinations
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination) => (
                  <TravelCard key={destination?.id} destination={destination} />
                ))}
              </div>
            </section>
          )}
        </main>
      );
}
