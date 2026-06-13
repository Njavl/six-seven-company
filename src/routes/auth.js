import { Router } from 'express';
import { loginUserSchema } from '../validation/auth.js';
import { loginUser, logoutUser, refreshUserSession } from '../controllers/auth.js';


const router = Router();

router.post("/login", celebrate(loginUserSchema), loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshUserSession);

export default router;
