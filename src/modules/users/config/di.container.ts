import UserListUseCase from "../application/useCases/User.list.useCase";
import EncryptArgon from "../infrastructure/Encrypt.argon";
import UserSqliteRepository from "../infrastructure/sqlite/User.sqlite.repository";
import UserDetailUseCase from "../application/useCases/User.detail.useCase";
import UserCreateUseCase from "../application/useCases/User.create.useCase";
import UserUpdateUseCase from "../application/useCases/User.update.useCase";
import UserDeleteUseCase from "../application/useCases/User.delete.useCase";

const encryptArgon = new EncryptArgon()
const userSqliteRepository = new UserSqliteRepository()

export const userListUseCase = new UserListUseCase(userSqliteRepository)
export const userDetailUseCase = new UserDetailUseCase(userSqliteRepository)
export const userCreateUseCase = new UserCreateUseCase(userSqliteRepository, encryptArgon)
export const userUpdateUseCase = new UserUpdateUseCase(userSqliteRepository, encryptArgon)
export const userDeleteUseCase = new UserDeleteUseCase(userSqliteRepository)