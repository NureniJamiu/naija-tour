import mongoose from 'mongoose';

const UserFavoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  attractionId: {
    type: String,
    required: true,
  },
  attractionName: {
    type: String,
    required: true,
  },
  attractionType: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.UserFavorite || mongoose.model('UserFavorite', UserFavoriteSchema);
