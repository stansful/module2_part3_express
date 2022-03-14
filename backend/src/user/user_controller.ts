import { Router } from '../framework/router';
import { VoidHandler } from '../framework/framework_interfaces';
import { userService } from './user_service';

const userRouter = new Router();

userRouter.post('/login', userService.signIn as VoidHandler);

export { userRouter };
