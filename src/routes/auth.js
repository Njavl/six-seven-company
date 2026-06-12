import { Router } from 'express';
import { loginUserSchema } from '../validation/auth.js';
import { loginUser, logoutUser, refreshUserSession } from '../controllers/auth.js';


const router = Router();

router.post("/auth/login", celebrate(loginUserSchema), loginUser);
router.post("/auth/logout", logoutUser);
router.post("/auth/refresh", refreshUserSession);

export default router;
