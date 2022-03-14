interface User {
  email: string;
  password: string;
}

interface Token {
  token: string;
}

interface Gallery {
  objects: string[];
  page: number;
  total: number;
}

interface ErrorMessage {
  errorMessage: string;
}
