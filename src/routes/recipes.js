import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { celebrate } from 'celebrate';
import {
  createRecipe,
  addRecipeToFavoritesController,
  getOwnRecipesController,
  getRecipeByIdController,
  removeRecipeFromFavoritesController,
} from '../controllers/recipes.js';
import { createRecipeValidation } from '../validation/recipes.js';
import { upload } from '../middlewares/upload.js';

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

router.get('/:recipeId', getRecipeByIdController);

router.post(
  '/',
  upload.single('recipeImg'),
  celebrate(createRecipeValidation),
  createRecipe
);

export default router;
