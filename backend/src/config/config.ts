import { Config } from './config_interface';
import path from 'path';

export const config: Config = {
  env: {
    PORT: Number(process.env.PORT) || 5555,
    PROTOCOL: process.env.PROTOCOL || 'http',
    DOMAIN: process.env.DOMAIN || 'localhost',
    DEFAULT_PICTURE_LIMIT: Number(process.env.PICTURE_LIMIT) || 6,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN || 'token',
    LOG_INTERVAL_IN_MINUTES: Number(process.env.LOG_INTERVAL_IN_MINUTES) || 60,
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
