import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addRecipeToFavoritesController,
  getOwnRecipesController,
  getRecipeByIdController,
  getRecipes,
  removeRecipeFromFavoritesController,
} from '../controllers/recipes.js';
import { searchRecipesSchema } from '../validation/recipes.js';

const router = Router();

router.get('/search', celebrate(searchRecipesSchema), getRecipes);

router.get('/own', authenticate, getOwnRecipesController);

router.delete(
  '/:recipeId/favorite',
  authenticate,
  removeRecipeFromFavoritesController
);

router.post(
  '/:recipeId/favorite',
  authenticate,
  addRecipeToFavoritesController
);

router.get('/:recipeId', getRecipeByIdController);

export default router;
