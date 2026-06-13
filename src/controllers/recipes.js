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
