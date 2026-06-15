import { Router } from 'express';
import { getAllIngredientsController } from '../controllers/ingredients.js';

const router = Router();

router.get('/', getAllIngredientsController);

export default router;
