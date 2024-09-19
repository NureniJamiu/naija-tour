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

    // fetch user preferences
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

    if (!isLoaded) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col px-24 pt-20 w-full">
        {user ? (<>
            <section className="w-full">
                <h1 className="text-3xl my-5 border-l-2 border-l-green-600 pl-2 py-1 ml-4">Attractions you might like</h1>
                <ScrollMenu>
                    {recommendations && recommendations.attractionRecommendations.map((destination) => (
                        <TravelCard
                            itemId={destination.id} // NOTE: itemId is required for track items
                            key={destination.id}
                            destination={destination}
                            className="w-80 mr-5"
                            //   onClick={handleClick(id)}
                            //   selected={isItemSelected(id)}
                        />
                    ))}
                </ScrollMenu>
            </section>

            <section className="mt-10 mb-5">
                <h1 className="text-3xl my-5 border-l-2 border-l-green-600 pl-2 py-1 ml-4">Based on your activities of interest</h1>
                <ScrollMenu>
                    {recommendations && recommendations.activityRecommendations.map((destination) => (
                        <TravelCard
                            itemId={destination?.id} // NOTE: itemId is required for track items
                            key={destination?.id}
                            destination={destination}
                            className="w-80 mr-5"
                            //   onClick={handleClick(id)}
                            //   selected={isItemSelected(id)}
                        />
                    ))}
                </ScrollMenu>
            </section>

            <section className="mt-10 mb-5">
                <h1 className="text-3xl my-5 border-l-2 border-l-green-600 pl-2 py-1 ml-4">Recommedations based on your preferred regions</h1>
                <ScrollMenu>
                    {recommendations && recommendations.regionRecommendations.map((destination) => (
                        <TravelCard
                            itemId={destination?.id} // NOTE: itemId is required for track items
                            key={destination?.id}
                            destination={destination}
                            className="w-80 mr-5"
                            //   onClick={handleClick(id)}
                            //   selected={isItemSelected(id)}
                        />
                    ))}
                </ScrollMenu>
            </section>
        </>): (<section>
        <h1 className="text-3xl my-5 border-l-2 border-l-green-600 pl-2 py-1 ml-4">All Destinations</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
            <TravelCard key={destination?.id} destination={destination} />
        ))}
        </div>
    </section>)}
    </main>
  );
}
