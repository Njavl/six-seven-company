import createHttpError from 'http-errors';

import { Recipe } from '../models/recipe.js';

export const getOwnRecipes = async (userId, page = 1, perPage = 12) => {
  const skip = (page - 1) * perPage;

  const [recipes, total] = await Promise.all([
    Recipe.find({ owner: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage),
    Recipe.countDocuments({ owner: userId }),
  ]);

  return {
    recipes,
    page,
    perPage,
    total,
    totalPages: Math.ceil(total / perPage),
  };
};

export const addRecipeToFavorites = async (userId, recipeId) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  await Recipe.findByIdAndUpdate(recipeId, {
    $addToSet: { favorites: userId },
  });

  return recipe;
};
