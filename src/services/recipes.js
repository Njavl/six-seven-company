import { Recipe } from '../models/recipe.js';

export const getRecipeById = async id => {
  return Recipe.findById(id);
};
