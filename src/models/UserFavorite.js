import mongoose from 'mongoose';

const UserFavoriteSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  attractionId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

UserFavoriteSchema.index({ user: 1, attractionId: 1 }, { unique: true });

export default mongoose.models.UserFavorite || mongoose.model('UserFavorite', UserFavoriteSchema);
