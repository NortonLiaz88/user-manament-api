export interface ExistUserRepository {
  existUserWithUsername(username: string): Promise<boolean>;

  existUserWithEmail(email: string): Promise<boolean>;
}
