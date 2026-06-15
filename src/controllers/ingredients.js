import { getAllIngredients } from '../services/ingredients.js';

export const getAllIngredientsController = async (_req, res) => {
  const ingredients = await getAllIngredients();
  res.json(ingredients);
};
