import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.get('/me', userControllers.me);
router.get('/user', userControllers.getAll);
router.get('/user/:id', userControllers.getOne);

router.post('/sign-in', userControllers.signIn);
router.post('/sign-up', userControllers.signUp);
router.post('/refresh-token', userControllers.refreshToken);

router.put('/', userControllers.update);

export { router as userRouter };
