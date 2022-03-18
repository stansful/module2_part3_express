import { config } from '../config/config';

class TokenService {
  private readonly secretToken: string;

  constructor() {
    this.secretToken = config.env.SECRET_AUTHORIZATION_TOKEN;
  }

  public verifyToken(token: string) {
    return this.secretToken === token;
  }

  public get token() {
    return this.secretToken;
  }
}

export const tokenService = new TokenService();
