import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createRecipe } from '../controllers/recipes.js';
import { createRecipeValidation } from '../validation/recipes.js';
import { upload } from '../middlewares/upload.js';

const router = Router();

router.post(
  '/',
  upload.single('recipeImg'),
  celebrate(createRecipeValidation),
  createRecipe
);

export default router;
