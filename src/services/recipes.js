import createHttpError from 'http-errors';

import { Ingredient } from '../models/ingredient.js';
import { Recipe } from '../models/recipe.js';
import { User } from '../models/user.js';

const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const toPaginationData = (page, perPage, total) => {
  return {
    page,
    perPage,
    total,
    totalPages: Math.ceil(total / perPage) || 1,
  };
};

export const searchRecipes = async ({
  page = 1,
  perPage = 12,
  category,
  ingredient,
  search,
}) => {
  const skip = (page - 1) * perPage;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.title = {
      $regex: escapeRegex(search),
      $options: 'i',
    };
  }

  if (ingredient) {
    const matchedIngredients = await Ingredient.find({
      name: {
        $regex: escapeRegex(ingredient),
        $options: 'i',
      },
    }).select('_id');

    const ingredientIds = matchedIngredients.map(item => item._id);

    if (ingredientIds.length === 0) {
      return {
        ...toPaginationData(page, perPage, 0),
        recipes: [],
      };
    }

    filter['ingredients.id'] = {
      $in: ingredientIds,
    };
  }

  const [recipes, total] = await Promise.all([
    Recipe.find(filter).skip(skip).limit(perPage).sort({ createdAt: -1 }),
    Recipe.countDocuments(filter),
  ]);

  return {
    ...toPaginationData(page, perPage, total),
    recipes,
  };
};

export const removeRecipeFromFavorites = (userId, recipeId) =>
  User.findByIdAndUpdate(
    userId,
    { $pull: { favorites: recipeId } },
    { new: true }
  );

export const deleteOwnRecipe = async (userId, recipeId) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw createHttpError(404, 'Recipe not found');
  }

  if (recipe.owner.toString() !== userId.toString()) {
    throw createHttpError(403, 'You can only delete your own recipes');
  }

  await Recipe.findByIdAndDelete(recipeId);

  await User.updateMany(
    { favorites: recipeId },
    { $pull: { favorites: recipeId } }
  );

  return recipe;
};

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

export const createRecipe = (ownerId, data) =>
  Recipe.create({ ...data, owner: ownerId });

export const getFavoriteRecipes = async (userId, page = 1, perPage = 12) => {
  const user = await User.findById(userId).populate('favorites');

  const favorites = user?.favorites ?? [];
  const total = favorites.length;
  const skip = (page - 1) * perPage;
  const recipes = favorites.slice(skip, skip + perPage);

  return {
    recipes,
    page,
    perPage,
    total,
    totalPages: Math.ceil(total / perPage),
  };
};
