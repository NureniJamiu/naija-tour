'use server';

import { connectToDB } from '@/lib/mongodb';
import UserPreference from '@/models/UserPreference';

export async function addUserPreference({ userId, activityTypes, attractionTypes, regionTypes }) {
  try {
    await connectToDB();

    const newPreference = new UserPreference({
      userId,
      activityTypes,
      attractionTypes,
      regionTypes
    });

    await newPreference.save();
    return { success: true, message: "Congratulations! We'll recommend destinations to you based on your preferences." };
  } catch (error) {
    console.error("Failed to add user preference:", error);
    return { success: false, error: "Failed to add user preference" };
  }
}

export async function fetchUserPreferences(userId) {
    try {
      await connectToDB();
      const preferences = await UserPreference.findOne({ userId });

      if (!preferences) {
        return { success: false, message: 'User preferences not found' };
      }

      return { success: true, data: preferences };
    } catch (error) {
      console.error("Failed to fetch user preferences:", error);
      return { success: false, error: 'Error fetching user preferences' };
    }
  }
