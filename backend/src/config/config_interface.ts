interface Path {
  pictures: string;
  logs: string;
  uploads: string;
}

interface Env {
  PORT: number;
  PROTOCOL: string;
  DOMAIN: string;
  DEFAULT_PICTURE_LIMIT: number;
  SECRET_AUTHORIZATION_TOKEN: string;
}

interface HttpStatusCodes {
  OK: number;
  CREATED: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  NOT_FOUND: number;
  INTERNAL_SERVER_ERROR: number;
}

export interface Config {
  env: Env;
  httpStatusCodes: HttpStatusCodes;
  static: {
    path: Path;
  };
}
