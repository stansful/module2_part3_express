import { Config } from './config_interface';
import path from 'path';

export const config: Config = {
  env: {
    PORT: Number(process.env.PORT) || 5555,
    PROTOCOL: process.env.PROTOCOL || 'http',
    DOMAIN: process.env.DOMAIN || 'localhost',
    DEFAULT_PICTURE_LIMIT: Number(process.env.PICTURE_LIMIT) || 6,
    SECRET_AUTHORIZATION_TOKEN: process.env.TOKEN || 'token',
  },
  httpStatusCodes: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  static: {
    path: {
      pictures: path.resolve(__dirname, '..', '..', 'static', 'pictures'),
      logs: path.resolve(__dirname, '..', '..', 'logs'),
      uploads: path.resolve(__dirname, '..', '..', 'uploads'),
    },
  },
};
