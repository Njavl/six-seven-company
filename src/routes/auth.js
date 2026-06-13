import { Router } from 'express';
import { loginUserSchema } from '../validation/auth.js';
import { loginUser, logoutUser, refreshUserSession } from '../controllers/auth.js';


import { registerUserController } from '../controllers/auth.js';
import { registerUserSchema } from '../validation/auth.js';
import { validateBody } from '../middlewares/validatebody.js';

const router = Router();

router.post("/login", celebrate(loginUserSchema), loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshUserSession);
router.post(
  '/register',
  validateBody(registerUserSchema),
  registerUserController
);

export default router;
