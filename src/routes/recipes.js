import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { removeRecipeFromFavoritesController } from '../controllers/recipes.js';

import {
  addRecipeToFavoritesController,
  getOwnRecipesController,
} from '../controllers/recipes.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.delete(
  '/:recipeId/favorite',
  authenticate,
  removeRecipeFromFavoritesController
);
router.get('/own', authenticate, getOwnRecipesController);

router.post('/:recipeId/favorite', authenticate, addRecipeToFavoritesController);

export default router;
