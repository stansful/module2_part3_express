import { Router } from 'express';
import { authService } from './auth_service';

const authRouter = Router();

authRouter.post('/login', authService.signIn);

export { authRouter };
