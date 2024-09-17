import mongoose from 'mongoose';

const UserPreferenceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  activityTypes: {
    type: [String], // Array of strings
    required: true,
  },
  attractionTypes: {
    type: [String],
    required: true,
  },
  regionTypes: {
    type: [String],
    required: true,
  }
});

export default mongoose.models.UserPreference || mongoose.model('UserPreference', UserPreferenceSchema);
