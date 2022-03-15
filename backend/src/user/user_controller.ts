import { Router } from 'express';
import { signIn } from './user_service';

const userRouter = Router();

userRouter.post('/login', signIn);

export { userRouter };
