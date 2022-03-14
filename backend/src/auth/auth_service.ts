import { NextFunction, Request, Response } from 'express';
import { tokenService } from '../token/token_service';
import { ExceptionService } from '../exception/exceptions_service';

class AuthService {
  public validateToken(req: Request, res: Response, next: NextFunction) {
    const userToken = req.headers.authorization || '';

    const isValid = tokenService.verifyToken(userToken);

    if (isValid) {
      return next();
    }

    throw ExceptionService.Unauthorized('Token is not valid');
  }
}

export const authService = new AuthService();
