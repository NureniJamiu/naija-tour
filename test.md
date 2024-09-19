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
