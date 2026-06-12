import { Router } from 'express';

import { registerUserController } from '../controllers/auth.js';
import { registerUserSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validatebody.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  registerUserController
);

export default router;
