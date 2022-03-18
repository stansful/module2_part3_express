import { ExceptionService } from '../exceptions_service';
import { config } from '../../config/config';

export class InternalServerError<Type> extends ExceptionService<Type> {
  constructor(message: string, data?: Type) {
    super(config.httpStatusCodes.INTERNAL_SERVER_ERROR, message, data);
  }
}
