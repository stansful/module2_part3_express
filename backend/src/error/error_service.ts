import { NextFunction, Request, Response } from 'express';
import { Exception } from '../exception/exception';
import { config } from '../config/config';

class ErrorService {
  public handleError(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof Exception) {
      return res.status(error.status).json({ errorMessage: error.message });
    }
    res.status(config.httpStatusCodes.INTERNAL_SERVER_ERROR).json({ errorMessage: 'Oops...' });
  }
}

export const errorService = new ErrorService();
