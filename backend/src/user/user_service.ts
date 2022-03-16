import { User } from './user_interface';
import { localDatabase } from '../database/local_database';
import { ExceptionService } from '../exception/exceptions_service';

class UserService {
  public verifyPasswords(candidatePassword: string, userPassword: string) {
    const isValid = candidatePassword === userPassword;
    if (!isValid) {
      throw ExceptionService.Unauthorized('Password verify failed');
    }
  }

  public getOne(candidate: User): User {
    return localDatabase.getOne(candidate);
  }
}

export const userService = new UserService();
