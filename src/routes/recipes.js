import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import {
  addRecipeToFavoritesController,
  getOwnRecipesController,
  getRecipeByIdController,
  removeRecipeFromFavoritesController,
  getFavoriteRecipesController,
} from '../controllers/recipes.js';

const router = Router();

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

router.get('/favorites', authenticate, getFavoriteRecipesController);

router.get('/:recipeId', getRecipeByIdController);

export default router;
