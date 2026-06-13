import { User } from '../models/user.js';
import createHttpError from 'http-errors';
import { Recipe } from '../models/recipe.js';

export const removeRecipeFromFavorites = (userId, recipeId) =>
  User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: recipeId } },
    { new: true }
  );

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

  await User.findByIdAndUpdate(userId, {
    $addToSet: { favorites: recipeId },
  });

  return recipe;
};

export const getRecipeById = async id => {
  return Recipe.findById(id);
};
