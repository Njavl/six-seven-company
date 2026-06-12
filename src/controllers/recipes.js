import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { getRecipeById } from '../services/recipes.js';

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
