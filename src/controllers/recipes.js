import createHttpError from 'http-errors';
import mongoose, { isValidObjectId } from 'mongoose';
import { removeRecipeFromFavorites } from '../services/recipes.js';
import {
  addRecipeToFavorites,
  getOwnRecipes,
  getRecipeById,
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
  } catch (err) {
    next(err);
  }
};
import { Recipe } from '../models/recipe.js';

export const createRecipe = async (req, res, next) => {
  try {
    const recipeData = { ...req.body };

    if (typeof recipeData.ingredients === 'string') {
      recipeData.ingredients = JSON.parse(recipeData.ingredients);
    }
    const photoUrl = req.file ? req.file.path : null;

    const recipe = await Recipe.create({
      ...recipeData,
      recipeImg: photoUrl,
      owner: req.user._id,
    });

    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};
