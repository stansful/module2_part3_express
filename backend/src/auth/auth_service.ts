import { NextFunction, Request, Response } from 'express';
import { tokenService } from '../token/token_service';
import { userService } from '../user/user_service';
import { User } from '../user/user_interface';
import { Unauthorized } from '../exception/http/unauthorized';
import { loggerService } from '../logger/logger_service';
import { config } from '../config/config';

class AuthService {
  public async validateToken(req: Request, res: Response, next: NextFunction) {
    const userToken = req.headers.authorization || '';

    try {
      await tokenService.verifyToken(userToken);
      next();
    } catch (error) {
      await loggerService.logger(`Sign in failed, Token is compromised. ${error}`);
      const unAuthorizedMessage = { errorMessage: 'Token is compromised' };
      res.status(config.httpStatusCodes.UNAUTHORIZED).json(unAuthorizedMessage);
    }
  }

  public verifyPassword(candidatePassword: string, userPassword: string) {
    const isValid = candidatePassword === userPassword;
    if (!isValid) {
      throw new Unauthorized('Password verify failed');
    }
  }

  public signIn = async (req: Request, res: Response) => {
    const candidate: User = { email: req.body.email, password: req.body.password };
    try {
      const user = userService.getOne(candidate);
      this.verifyPassword(candidate.password, user.password);

      const token = await tokenService.sign(user.email);
      res.json({ token });
    } catch (error) {
      await loggerService.logger(`Sign in failed. ${error}`);

      const unAuthorizedMessage = { errorMessage: 'Email or password are invalid.' };
      res.status(config.httpStatusCodes.UNAUTHORIZED).json(unAuthorizedMessage);
    }
  };
}

export const authService = new AuthService();
