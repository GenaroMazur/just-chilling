import UserListUseCase from "../application/useCases/User.list.useCase";
import EncryptArgon from "../infrastructure/Encrypt.argon";
import UserSqliteRepository from "../infrastructure/sqlite/User.sqlite.repository";
import UserPostgresRepository from "../infrastructure/postgres/User.postgres.repository";
import UserDetailUseCase from "../application/useCases/User.detail.useCase";
import UserCreateUseCase from "../application/useCases/User.create.useCase";
import UserUpdateUseCase from "../application/useCases/User.update.useCase";
import UserDeleteUseCase from "../application/useCases/User.delete.useCase";
import UserRepository from "../domain/interfaces/User.repository";

const encryptArgon = new EncryptArgon()

const userRepository: UserRepository = process.env.DB_TYPE !== 'sqlite'
    ? new UserPostgresRepository()
    : new UserSqliteRepository()

export const userListUseCase = new UserListUseCase(userRepository)
export const userDetailUseCase = new UserDetailUseCase(userRepository)
export const userCreateUseCase = new UserCreateUseCase(userRepository, encryptArgon)
export const userUpdateUseCase = new UserUpdateUseCase(userRepository, encryptArgon)
export const userDeleteUseCase = new UserDeleteUseCase(userRepository)