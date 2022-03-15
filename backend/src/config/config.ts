import { Config } from './config_interface';
import path from 'path';

export const config: Config = {
  env: {
    PORT: Number(process.env.PORT) || 5000,
    PROTOCOL: process.env.PROTOCOL || 'http',
    DOMAIN: process.env.DOMAIN || 'localhost',
  },
  httpStatusCodes: {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  mimeTypes: {
    HTML: 'text/html',
    CSS: 'text/css',
    JS: 'text/javascript',
    JSON: 'application/json',
    BIN: 'application/octet-stream',
    JPEG: 'image/jpeg',
  },
  static: {
    path: {
      pictures: path.resolve(__dirname, '..', '..', 'static', 'pictures'),
      frontend: path.resolve(__dirname, '..', '..', 'static', 'frontend'),
      logs: path.resolve(__dirname, '..', '..', 'logs'),
      uploads: path.resolve(__dirname, '..', '..', 'uploads'),
    },
  },
  DEFAULT_PICTURE_LIMIT: 6,
  SECRET_AUTHORIZATION_TOKEN: 'token',
};
