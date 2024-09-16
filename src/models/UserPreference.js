import mongoose from 'mongoose';

const UserPreferenceSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },
  attractionTypes: [String],
  activities: [String],
  budget: String,
  travelStyle: String,
  preferredRegions: [String],
});

export default mongoose.models.UserPreference || mongoose.model('UserPreference', UserPreferenceSchema);
