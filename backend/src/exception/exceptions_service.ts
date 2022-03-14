import { config } from '../config/config';

export class ExceptionService<Type> extends Error {
  public readonly status: number;
  public readonly message: string;
  public readonly data?: Type;

  constructor(status: number, message: string, data?: Type) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = data;
  }

  public static BadRequest<Type>(message: string, data?: Type) {
    return new ExceptionService<Type>(config.httpStatusCodes.BAD_REQUEST, message, data);
  }

  public static Unauthorized<Type>(message: string, data?: Type) {
    return new ExceptionService<Type>(config.httpStatusCodes.UNAUTHORIZED, message, data);
  }

  public static NotFound<Type>(message: string, data?: Type) {
    return new ExceptionService<Type>(config.httpStatusCodes.NOT_FOUND, message, data);
  }

  public static InternalServerError<Type>(message: any, data?: Type) {
    return new ExceptionService<Type>(config.httpStatusCodes.INTERNAL_SERVER_ERROR, message, data);
  }
}
