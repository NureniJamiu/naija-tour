import mongoose from 'mongoose';

const UserFavoriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  destinationId: {
    type: String,
    required: true,
  },
  destinationName: {
    type: String,
    required: true,
  },
  destinationType: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.UserFavorite || mongoose.model('UserFavorite', UserFavoriteSchema);
