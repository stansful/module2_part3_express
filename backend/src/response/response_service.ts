import { ServerResponse } from 'http';
import {
  ResponseBadRequestMessage,
  ResponseErrorMessage,
  ResponseMessage,
  ResponseSuccessSignIn,
} from './response_interfaces';
import { tokenService } from '../token/token_service';
import { config } from '../configs/config';

class ResponseService {
  public badCredentials(res: ServerResponse, message: string = 'Email or password are invalid.') {
    const errorMessage: ResponseErrorMessage = { errorMessage: message };

    res.statusCode = config.httpStatusCodes.UNAUTHORIZED;
    res.setHeader('Content-Type', config.mimeTypes.JSON);
    res.end(JSON.stringify(errorMessage));
  }

  public successSignIn(res: ServerResponse) {
    const token: ResponseSuccessSignIn = { token: tokenService.token };

    res.statusCode = config.httpStatusCodes.OK;
    res.setHeader('Content-Type', config.mimeTypes.JSON);
    res.end(JSON.stringify(token));
  }

  public notFound(res: ServerResponse, message = 'Not Found') {
    const notFoundMessage: ResponseMessage = { message };

    res.statusCode = config.httpStatusCodes.NOT_FOUND;
    res.setHeader('Content-Type', config.mimeTypes.JSON);
    res.end(JSON.stringify(notFoundMessage));
  }

  public galleryObjects<Type>(res: ServerResponse, object: Type) {
    res.statusCode = config.httpStatusCodes.OK;
    res.setHeader('Content-Type', config.mimeTypes.JSON);
    res.end(JSON.stringify(object));
  }

  public badRequest(res: ServerResponse, end: number, start: number = 0) {
    const errorMessage: ResponseBadRequestMessage = {
      errorMessage: `Page should be greater than ${start} and less than ${end}`,
    };

    res.statusCode = config.httpStatusCodes.BAD_REQUEST;
    res.setHeader('Content-Type', config.mimeTypes.JSON);
    res.end(JSON.stringify(errorMessage));
  }

  public unauthorized(res: ServerResponse, message = 'Unauthorized') {
    const unauthorizedMessage: ResponseMessage = { message };

    res.statusCode = config.httpStatusCodes.UNAUTHORIZED;
    res.setHeader('Content-Type', config.mimeTypes.JSON);
    res.end(JSON.stringify(unauthorizedMessage));
  }
}

export const responseService = new ResponseService();
