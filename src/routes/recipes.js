import { Router } from 'express';

import {
  addRecipeToFavoritesController,
  getOwnRecipesController,
} from '../controllers/recipes.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/own', authenticate, getOwnRecipesController);

router.post('/:recipeId/favorite', authenticate, addRecipeToFavoritesController);

export default router;
