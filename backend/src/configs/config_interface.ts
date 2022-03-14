interface Path {
  [key: string]: string;
}

interface Files {
  [key: string]: string[];
}

export interface Config {
  env: {
    PORT: number;
    PROTOCOL: string;
    DOMAIN: string;
  };
  httpStatusCodes: {
    OK: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    NOT_FOUND: number;
    INTERNAL_SERVER_ERROR: number;
  };
  mimeTypes: {
    HTML: string;
    CSS: string;
    JS: string;
    JSON: string;
    BIN: string;
    JPEG: string;
  };
  static: {
    path: Path;
    files: Files;
  };
  DEFAULT_PICTURE_LIMIT: number;
  SECRET_AUTHORIZATION_TOKEN: string;
}
