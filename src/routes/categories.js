import { Router } from 'express';
import { getAllCategoriesController } from '../controllers/categories.js';

const router = Router();

router.get('/', getAllCategoriesController);

export default router;
