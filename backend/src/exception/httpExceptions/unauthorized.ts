import { ExceptionService } from '../exceptions_service';
import { config } from '../../config/config';

export class Unauthorized<Type> extends ExceptionService<Type> {
  constructor(message: string, data?: Type) {
    super(config.httpStatusCodes.UNAUTHORIZED, message, data);
  }
}
