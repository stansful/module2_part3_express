import { NextFunction, Request, Response } from 'express';
import { tokenService } from '../token/token_service';
import { userService } from '../user/user_service';
import { ExceptionService } from '../exception/exceptions_service';
import { User } from '../user/user_interface';

class AuthService {
  public validateToken(req: Request, res: Response, next: NextFunction) {
    const userToken = req.headers.authorization || '';

    const isValid = tokenService.verifyToken(userToken);
    if (!isValid) {
      throw ExceptionService.Unauthorized('Token is not valid');
    }

    next();
  }

  public verifyPassword(candidatePassword: string, userPassword: string) {
    const isValid = candidatePassword === userPassword;
    if (!isValid) {
      throw ExceptionService.Unauthorized('Password verify failed');
    }
  }

  public signIn = (req: Request, res: Response) => {
    const candidate: User = { email: req.body.email, password: req.body.password };
    try {
      const user = userService.getOne(candidate);
      this.verifyPassword(candidate.password, user.password);

      const token = { token: tokenService.token };
      res.json(token);
    } catch (error) {
      throw ExceptionService.Unauthorized('Email or password are invalid.');
    }
  };
}

export const authService = new AuthService();
