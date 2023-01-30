import express from 'express';

import { requireAuth } from '../../middlewares';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/me', requireAuth, userControllers.me);

router.post('/sign-in', userControllers.signIn);
router.post('/sign-up', userControllers.signUp);
router.post('/refresh-token', userControllers.refreshToken);

export { router as userRouter };
