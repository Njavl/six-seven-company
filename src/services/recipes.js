import createHttpError from 'http-errors';

import { Recipe } from '../models/recipe.js';
import { User } from '../models/user.js';

export const getOwnRecipes = async (userId) => {
  return await Recipe.find({ owner: userId }).sort({ createdAt: -1 });
};

export const addRecipeToFavorites = async (userId, recipeId) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $addToSet: { favorites: recipeId } },
    { new: true },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return recipe;
};
