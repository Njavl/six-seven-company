import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addRecipeToFavoritesController,
  getOwnRecipesController,
  getRecipeByIdController,
  getRecipes,
  removeRecipeFromFavoritesController,
} from '../controllers/recipes.js';

import { validateQuery } from '../middlewares/validatebody.js';
import { searchRecipesSchema } from '../validation/recipes.js';

const router = Router();

router.get('/search', validateQuery(searchRecipesSchema), getRecipes);

router.get('/own', authenticate, getOwnRecipesController);

router.delete(
  '/:recipeId/favorite',
  authenticate,
  removeRecipeFromFavoritesController,
);

router.post(
  '/:recipeId/favorite',
  authenticate,
  addRecipeToFavoritesController,
);

router.get('/:recipeId', getRecipeByIdController);

export default router;
