'use client'
import { addUserFavorite } from "@/app/actions/favorites"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { destinations } from "@/db/data"
import { useUser } from "@clerk/nextjs"
import { Banknote, MapPin, Star } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const DestinationPage = ({params}) => {
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter()
  const {user} = useUser();

  useEffect(() => {
    const findDestination = () => {
        // Convert params.slug to a number, as the id in your data is a number
        const slugId = parseInt(params.slug, 10);
        if (isNaN(slugId)) {
          setError("Invalid destination ID");
          setLoading(false);
          return;
        }

        const dest = destinations.find(item => item.id === slugId);
        if (dest) {
          setDestination(dest);
        } else {
          setError("Destination not found");
        }
        setLoading(false);
      };

      findDestination();
    }, [params.slug]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!destination) {
      return <div>Destination not found</div>;
    }

    const handleClick = async () => {
        setIsLoading(true);
        console.log("STARTING ADD TO FAVORITES")
        if (!user) return router.push("/sign-in");
        try {
            const result = await addUserFavorite({
                userId: user.id,
                destinationId: destination.id,
                destinationName: destination.name,
                destinationType: destination.type
            })
            alert("Favorite added successfully")
        } catch (error) {
            alert("ERROR:", error)
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="mt-12 container mx-auto px-4 py-8">
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden mb-8">
        <img
          src={destination?.images[0]}
          alt={destination?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
            {destination?.name}
          </h1>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="attractions" disabled>Attractions</TabsTrigger>
          <TabsTrigger value="accommodations" disabled>Accommodations</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">{destination?.name}</CardTitle>
              <CardDescription>Key information about {destination?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{destination?.state} - {destination?.region} Region</span>
                </div>
                <div className="flex items-center gap-2">
                  <Banknote className="h-5 w-5 text-muted-foreground" />
                  <span className="font-bold text-green-600 text-lg">₦{destination?.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-muted-foreground" />
                  <span>{destination?.rating} average rating</span>
                </div>
              </div>
              <p className="mt-4">
                {destination?.description}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attractions">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {["Ubud Monkey Forest", "Tanah Lot Temple", "Mount Batur"].map((attraction) => (
              <Card key={attraction}>
                <CardHeader>
                  <CardTitle>{attraction}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt={attraction}
                    width={300}
                    height={200}
                    className="rounded-lg mb-4"
                  />
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="accommodations">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {["Luxury Resort", "Beachfront Villa", "Eco Lodge"].map((accommodation) => (
              <Card key={accommodation}>
                <CardHeader>
                  <CardTitle>{accommodation}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt={accommodation}
                    width={300}
                    height={200}
                    className="rounded-lg mb-4"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <Button variant="outline" className="w-full">
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: "John Doe", rating: 5, comment: "Amazing experience! Will definitely come back." },
              { name: "Jane Smith", rating: 4, comment: "Beautiful beaches and friendly locals." },
            ].map((review, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{review.name}</CardTitle>
                  <CardDescription>
                    {Array(review.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="inline-block h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-green-600 text-primary-foreground">
        <CardHeader>
          <CardTitle>Like what you see👀?</CardTitle>
          <CardDescription className="text-primary-foreground/70">
            Book your dream vacation today!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" size="lg" onClick={handleClick} disabled={isLoading}>
            {!isLoading ? "Add to favorites now" : "Adding to favorites..."}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default DestinationPage;
