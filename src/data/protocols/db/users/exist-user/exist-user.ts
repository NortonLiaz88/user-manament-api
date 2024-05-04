import { ExistUserRepository } from "src/data/usecases/users/db-exist-user-repository";
import { ExistUser } from "src/domain/usecases/users/exist-user/exist-user";


export class DbExistUser implements ExistUser {
  constructor(private readonly existUserRepository: ExistUserRepository) {}


  async existUserWithUsername(username: string): Promise<boolean> {
    return await this.existUserRepository.existUserWithUsername(username);
  }

  async existUserWithEmail(email: string): Promise<boolean> {
    return await this.existUserRepository.existUserWithEmail(email);
  }
}
