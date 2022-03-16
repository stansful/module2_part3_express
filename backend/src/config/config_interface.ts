interface Path {
  [key: string]: string;
}

interface Env {
  PORT: number;
  PROTOCOL: string;
  DOMAIN: string;
}

interface HttpStatusCodes {
  OK: number;
  CREATED: number;
  BAD_REQUEST: number;
  UNAUTHORIZED: number;
  NOT_FOUND: number;
  INTERNAL_SERVER_ERROR: number;
}

interface MimeTypes {
  HTML: string;
  CSS: string;
  JS: string;
  JSON: string;
  BIN: string;
  JPEG: string;
}

export interface Config {
  env: Env;
  httpStatusCodes: HttpStatusCodes;
  mimeTypes: MimeTypes;
  static: {
    path: Path;
  };
  DEFAULT_PICTURE_LIMIT: number;
  SECRET_AUTHORIZATION_TOKEN: string;
}
