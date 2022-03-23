import express from 'express';
import { Controller } from '../helpers/controller_interface';
import { authService } from './auth_service';

class AuthController implements Controller {
  public path: string;
  public router: express.Router;

  constructor() {
    this.path = '/login';
    this.router = express.Router();

    this.addRoutes();
  }

  private addRoutes() {
    this.router.post(this.path, authService.signIn);
  }
}

export const authRouter = new AuthController().router;
