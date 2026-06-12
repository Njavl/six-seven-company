import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';
import { removeRecipeFromFavorites } from '../services/recipes.js';
import {
  addRecipeToFavorites,
  getOwnRecipes,
} from '../services/recipes.js';

export const removeRecipeFromFavoritesController = async (req, res) => {
  const { recipeId } = req.params;

  if (!isValidObjectId(recipeId)) {
    throw createHttpError(400, 'Invalid recipe id');
  }

  await removeRecipeFromFavorites(req.user._id, recipeId);

  res.json({ message: 'Recipe removed from favorites' });
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
