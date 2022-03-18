import { ExceptionService } from '../exceptions_service';
import { config } from '../../config/config';

export class BadRequest<Type> extends ExceptionService<Type> {
  constructor(message: string, data?: Type) {
    super(config.httpStatusCodes.BAD_REQUEST, message, data);
  }
}
