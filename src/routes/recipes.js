import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';
import {
  addRecipeToFavoritesController,
  createRecipeController,
  getOwnRecipesController,
  getRecipeByIdController,
  getRecipes,
  removeRecipeFromFavoritesController,
  getFavoriteRecipesController,
} from '../controllers/recipes.js';
import {
  createRecipeSchema,
  searchRecipesSchema,
} from '../validation/recipes.js';

const router = Router();

router.get('/search', celebrate(searchRecipesSchema), getRecipes);

router.get('/own', authenticate, getOwnRecipesController);

router.post(
  '/',
  authenticate,
  upload.single('recipeImg'),
  celebrate(createRecipeSchema),
  createRecipeController
);

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
