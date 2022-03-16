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

  public signIn(req: Request, res: Response) {
    const candidate: User = { email: req.body.email, password: req.body.password };
    try {
      const user = userService.getOne(candidate);
      userService.verifyPasswords(candidate.password, user.password);

      const token = { token: tokenService.token };
      res.json(token);
    } catch (error) {
      throw ExceptionService.Unauthorized('Email or password are invalid.');
    }
  }
}

export const authService = new AuthService();
