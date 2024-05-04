import { Inject, Injectable } from '@nestjs/common';
import { TokenDecoder } from '../../../data/protocols/cryptography/token-decoder';
import { DbAddAccount } from '../../../data/usecases/account/add-account/db-add-account';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { DbRefreshToken } from '../../../data/usecases/authentication/db-refresh-token';
import { AuthToken } from 'src/domain/models/auth-token';
import { AddAccountModel } from 'src/domain/usecases/account/add-account/add-account';
import { AuthenticationModel } from 'src/domain/usecases/authentication/authentication';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private readonly dbAuth: DbAuthentication,
    @Inject() private readonly dbAddAccount: DbAddAccount,
    @Inject() private readonly dbRefreshToken: DbRefreshToken,
    @Inject() private readonly tokenDecoder: TokenDecoder,
  ) {}

  async loginWithCredentials(authData: AuthenticationModel) {
    const token = await this.dbAuth.auth({
      email: authData.email,
      password: authData.password,
    });
    return token;
  }

  async addAccount(accountData: AddAccountModel) {
    return await this.dbAddAccount.add(accountData);
  }

  async refreshToken(token: string) {
    const payload: AuthToken = await this.dbRefreshToken.refresh(token);
    return payload;
  }

  async getUserByToken(token: string) {
    const payload = await this.tokenDecoder.decode(token);
    return payload;
  }
}
