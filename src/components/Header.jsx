'use client';
import { deleteUserFavorite, fetchUserFavorites } from "@/app/actions/favorites";
import { UserButton, useUser } from "@clerk/nextjs";
import { FolderHeart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toggleFavorite, setToggleFavorite] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();
  const { user } = useUser();

  // Log favorites whenever it changes
  useEffect(() => {
    console.log("Updated favorites:", favorites);
  }, [favorites]);

  // Function to fetch and toggle favorites
  const handleFavoritesToggle = async () => {
    if (!user) return; // Ensure the user is defined

    // Close favorites dropdown if it's already open
    if (toggleFavorite) return setToggleFavorite(false);

    setToggleFavorite(true);
    setIsLoading(true);

    try {
      const allFavorites = await fetchUserFavorites(user.id);
      setFavorites(allFavorites?.data || []); // Safely handle no data case
    } catch (error) {
      console.log("ERROR FETCHING USER FAVORITES:", error);
      setFavorites([]); // Set to an empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle favorite deletion
  async function handleDeleteFavorite(userId, favoriteId, setFavorites) {
    const confirmed = window.confirm("Are you sure you want to delete this favorite?");
    if (confirmed) {
      try {
        const response = await deleteUserFavorite(userId, favoriteId);
        if (response.success) {
          // Update the state to remove the deleted favorite
          setFavorites((prevFavorites) => prevFavorites.filter((f) => f.id !== favoriteId));
          alert("Favorite deleted successfully");
          console.log("Favorite deleted successfully");
        } else {
          console.log("Error deleting favorite");
        }
      } catch (error) {
        console.error("Error deleting favorite:", error);
      }
    }
  }

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-24 py-3 bg-white shadow-sm z-10">
      <a href="/" className="text-green-600 text-xl font-semibold">
        9ja<span className="text-black">Tour</span>
      </a>
      <div className="flex items-center justify-between gap-1">
        {!user ? (
          <>
            <a href="/sign-in" className="text-gray-600">Login</a>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => router.push("/sign-up")}
            >
              Signup
            </Button>
          </>
        ) : (
          <>
            <div>
              <span
                className="flex items-center justify-center p-2 rounded-full bg-red-200 cursor-pointer mr-4"
                onClick={handleFavoritesToggle}
              >
                <FolderHeart size={18} className="text-red-500" />
              </span>
            </div>
            <span className="capitalize">{user?.username} | </span>
            <UserButton />
            {toggleFavorite && (
              <div className="absolute right-5 top-16 w-64 bg-white rounded shadow-lg p-3 max-h-52 overflow-y-scroll">
                {isLoading ? (
                  <span>Loading...</span>
                ) : favorites.length === 0 ? (
                  <span>No favorites yet</span>
                ) : (
                  <ul>
                    {favorites.map((favorite) => (
                      <li
                        key={favorite.id}
                        className="flex items-center justify-between gap-1 hover:bg-gray-200 rounded p-2"
                      >
                        <span className="block">
                          <Link
                            href={`/destinations/${favorite.destinationId}`}
                            className="hover:underline text-sm"
                          >
                            {favorite.destinationName}
                          </Link>
                          <span className="inline-block text-xs text-gray-500">
                            {favorite.destinationType}
                          </span>
                        </span>
                        <span
                          className="inline-block text-red-500 cursor-pointer hover:bg-red-200 rounded p-2"
                          onClick={() => handleDeleteFavorite(user.id, favorite.id, setFavorites)}
                        >
                          <Trash2 size={18} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
