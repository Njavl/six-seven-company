import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { removeRecipeFromFavoritesController } from '../controllers/recipes.js';

const router = Router();

router.delete(
  '/:recipeId/favorite',
  authenticate,
  removeRecipeFromFavoritesController
);

export default router;
