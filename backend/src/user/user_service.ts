import { Request, Response } from 'express';
import { User } from './user_interface';
import { localDatabase } from '../database/local_database';
import { ExceptionService } from '../exception/exceptions_service';
import { tokenService } from '../token/token_service';

class UserService {
  private verifyPasswords(candidatePassword: string, userPassword: string) {
    const isValid = candidatePassword === userPassword;
    if (!isValid) {
      throw ExceptionService.Unauthorized('Password verify failed');
    }
  }

  public signIn(req: Request, res: Response) {
    const candidate: User = { email: req.body.email, password: req.body.password };
    try {
      const user = localDatabase.getOne(candidate);
      this.verifyPasswords(candidate.password, user.password);

      const token = { token: tokenService.token };
      res.json(token);
    } catch (error) {
      throw ExceptionService.Unauthorized('Email or password are invalid.');
    }
  }
}

const saveContext = (req: Request, res: Response) => {
  const userService = new UserService();
  return userService.signIn(req, res);
};

export const userService = saveContext;
