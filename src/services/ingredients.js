import { Ingredient } from '../models/ingredient.js';

export const getAllIngredients = () => Ingredient.find();
