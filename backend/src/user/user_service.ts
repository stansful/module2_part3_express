import { User } from './user_interface';
import { localDatabase } from '../database/local_database';

class UserService {
  public getOne(candidate: User): User {
    return localDatabase.getOne(candidate);
  }
}

export const userService = new UserService();
