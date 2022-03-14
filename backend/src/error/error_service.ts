import { NextFunction, Request, Response } from 'express';
import { ExceptionService } from '../exception/exceptions_service';
import { config } from '../configs/config';

class ErrorService {
  public handleError(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof ExceptionService) {
      return res.status(error.status).json({ errorMessage: error.message });
    }
    res.status(config.httpStatusCodes.INTERNAL_SERVER_ERROR).send('OOPS something goes wrong...');
  }
}

export const errorService = new ErrorService();
