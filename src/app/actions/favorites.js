'use server';

import { connectToDB } from '@/lib/mongodb';
import UserFavorite from '@/models/UserFavorite';

export async function addUserFavorite({ userId, destinationId, destinationName, destinationType }) {
  try {
    await connectToDB();

    const newFavorite = new UserFavorite({
      userId,
      destinationId,
      destinationName,
      destinationType
    });

    const favorite = await newFavorite.save();
    return {
        success: true,
        data: favorite,
        message: "Successfully added to favorites"};
  } catch (error) {
    console.error("Failed to add to favorites:", error);
    return { success: false, error: "Failed to add to favorites" };
  }
}

export async function fetchUserFavorites(userId) {
    try {
      await connectToDB();
      const favorites = await UserFavorite.findOne({ userId });

      if (!favorites) {
        return { success: false, message: 'User favorites not found' };
      }

      return { success: true, data: favorites };
    } catch (error) {
      console.error("Failed to fetch user favorites:", error);
      return { success: false, error: 'Error fetching user favorites' };
    }
  }
