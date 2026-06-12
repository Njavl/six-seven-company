import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { removeRecipeFromFavorites } from '../services/recipes.js';

export const removeRecipeFromFavoritesController = async (req, res) => {
  const { recipeId } = req.params;

  if (!isValidObjectId(recipeId)) {
    throw createHttpError(400, 'Invalid recipe id');
  }

  await removeRecipeFromFavorites(req.user._id, recipeId);

  res.json({ message: 'Recipe removed from favorites' });
};
