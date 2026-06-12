import { Router } from 'express';
import { getRecipeByIdController } from '../controllers/recipes.js';

const router = Router();

router.get('/:recipeId', getRecipeByIdController);

export default router;
