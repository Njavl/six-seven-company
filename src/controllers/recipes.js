import createHttpError from 'http-errors';
import mongoose, { isValidObjectId } from 'mongoose';

import {
  addRecipeToFavorites,
  createRecipe,
  getOwnRecipes,
  getRecipeById,
  removeRecipeFromFavorites,
  searchRecipes,
} from '../services/recipes.js';

export const getRecipes = async (req, res, next) => {
  try {
    const result = await searchRecipes(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const removeRecipeFromFavoritesController = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    if (!isValidObjectId(recipeId)) {
      throw createHttpError(400, 'Invalid recipe id');
    }

    await removeRecipeFromFavorites(req.user._id, recipeId);

    res.json({ message: 'Recipe removed from favorites' });
  } catch (error) {
    next(error);
  }
};

export const getOwnRecipesController = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 12;

    const result = await getOwnRecipes(req.user._id, page, perPage);

    res.status(200).json({
      status: 200,
      message: 'Own recipes fetched successfully',
      data: {
        recipes: result.recipes,
        page: result.page,
        perPage: result.perPage,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addRecipeToFavoritesController = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    const recipe = await addRecipeToFavorites(req.user._id, recipeId);

    res.status(200).json({
      status: 200,
      message: 'Recipe added to favorites successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipeByIdController = async (req, res, next) => {
  try {
    const { recipeId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      throw createHttpError(400, 'Invalid recipe ID format');
    }

    const recipe = await getRecipeById(recipeId);

    if (!recipe) {
      throw createHttpError(404, 'Recipe not found');
    }

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const createRecipeController = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createHttpError(400, 'Recipe image is required');
    }

    const data = { ...req.body, thumb: req.file.path };

    if (typeof data.ingredients === 'string') {
      try {
        data.ingredients = JSON.parse(data.ingredients);
      } catch {
        throw createHttpError(400, 'Invalid ingredients format');
      }
    }

    if (data.calories === '' || data.calories === null) {
      delete data.calories;
    }

    const recipe = await createRecipe(req.user._id, data);

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const getFavoriteRecipesController = async (req, res, next) => {
  try {
    const favorites = await getFavoriteRecipes(req.user._id);

    res.status(200).json({
      status: 200,
      message: 'Favorite recipes fetched successfully',
      data: favorites,
    });
  } catch (error) {
    next(error);
  }
};
