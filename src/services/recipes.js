import { Types } from 'mongoose';
import { User } from '../models/user.js';

export const removeRecipeFromFavorites = (userId, recipeId) =>
  User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: new Types.ObjectId(recipeId) } },
    { new: true, strict: false }
  );
