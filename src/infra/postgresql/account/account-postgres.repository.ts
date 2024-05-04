import { UserStatus } from '@prisma/client';
import { UserModel } from 'src/domain/models/user.model';
import { AddAccountModel } from 'src/domain/usecases/account/add-account/add-account';

import { GetAccountByEmailRepository } from '../../../data/protocols/db/authentication/db-get-account-by-email';
import { AddAccountRepository } from '../../../data/protocols/db/account/db-add-account-repository';
import { GetAccountByIdRepository } from '../../../data/protocols/db/account/db-get-account-repository';

import { PrismaClientService } from '../../orm/prisma/prisma-client.service';

export class AccountPostgresRepository
  implements
    AddAccountRepository,
    GetAccountByEmailRepository,
    GetAccountByIdRepository
{
  constructor(private readonly ormService: PrismaClientService) {}

  async add(account: AddAccountModel): Promise<void> {
    await this.ormService.user.create({
      data: {
        username: account.username,
        email: account.email,
        password: account.password,
        name: account.name,
        lastName: account.lastName,
        permission: account.permission,
        status: UserStatus.ACTIVE,
      },
    });
  }

  async getByEmail(email: string): Promise<UserModel> {
    const account = await this.ormService.user.findUnique({
      where: {
        email,
      },
    });
    return account;
  }

  async getByUsername(username: string): Promise<UserModel> {
    const account = await this.ormService.user.findUnique({
      where: {
        username: username,
      },
    });
    return account;
  }

  async getById(id: number): Promise<UserModel> {
    const account = await this.ormService.user.findUnique({
      where: {
        id,
      },
    });
    return account;
  }
}
