import createHttpError from 'http-errors';

import { Category } from '../models/category.js';
import { Ingredient } from '../models/ingredient.js';
import { Recipe } from '../models/recipe.js';
import { User } from '../models/user.js';

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
    const categoryExists = await Category.exists({ name: category });

    if (!categoryExists) {
      return {
        ...toPaginationData(page, perPage, 0),
        recipes: [],
      };
    }

    filter.category = category;
  }

  if (search) {
    filter.title = {
      $regex: search,
      $options: 'i',
    };
  }

  if (ingredient) {
    const matchedIngredients = await Ingredient.find({
      name: {
        $regex: ingredient,
        $options: 'i',
      },
    }).select('_id');

    const ingredientIds = matchedIngredients.map((item) => item._id);

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
    Recipe.find(filter)
      .skip(skip)
      .limit(perPage)
      .populate('ingredients.id', 'name desc img')
      .sort({ createdAt: -1 }),
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
    { new: true },
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

export const getRecipeById = async (id) => {
  return Recipe.findById(id);
};
