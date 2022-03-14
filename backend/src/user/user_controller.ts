import { Router } from 'express';
import { userService } from './user_service';

const userRouter = Router();

userRouter.post('/login', userService);

export { userRouter };
