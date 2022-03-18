import { ExceptionService } from '../exceptions_service';
import { config } from '../../config/config';

export class NotFound<Type> extends ExceptionService<Type> {
  constructor(message: string, data?: Type) {
    super(config.httpStatusCodes.NOT_FOUND, message, data);
  }
}
