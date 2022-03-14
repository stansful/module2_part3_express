import { IncomingMessage, ServerResponse } from 'http';
import { User } from './user_interface';
import { localDatabase } from '../database/local_database';
import { responseService } from '../response/response_service';

class UserService {
  public signIn(req: IncomingMessage, res: ServerResponse, url: URL, body: User) {
    const candidate: User = { email: body.email, password: body.password };

    try {
      const user = localDatabase.getOne(candidate);
      const passwordMatch = user.password === candidate.password;

      if (passwordMatch) {
        return responseService.successSignIn(res);
      }
      responseService.badCredentials(res);
    } catch (error) {
      responseService.badCredentials(res);
    }
  }
}

export const userService = new UserService();
