import {
  addRecipeToFavorites,
  getOwnRecipes,
} from '../services/recipes.js';

export const getOwnRecipesController = async (req, res, next) => {
  try {
    const recipes = await getOwnRecipes(req.user._id);

    res.status(200).json({
      data: recipes,
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
      message: 'Recipe added to favorites successfully',
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
