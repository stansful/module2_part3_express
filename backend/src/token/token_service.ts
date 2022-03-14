import { config } from '../configs/config';

class TokenService {
  private readonly secretToken: string;

  constructor() {
    this.secretToken = config.SECRET_AUTHORIZATION_TOKEN;
  }

  public validateToken(token: string) {
    return this.secretToken === token;
  }

  public get token() {
    return this.secretToken;
  }
}

export const tokenService = new TokenService();
