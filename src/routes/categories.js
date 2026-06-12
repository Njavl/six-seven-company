import { Router } from 'express';
import { getAllCategories } from '../controllers/categories.js';

const router = Router();

router.get('/', getAllCategories);

export default router;
