import AuthLoginUseCase from "../application/useCases/Auth.login.useCase";
import TokenJwt from "../infrastructure/Token.jwt";
import AuthMiddleware from "../infrastructure/http/Auth.middleware";
import UserSqliteRepository from "../../users/infrastructure/sqlite/User.sqlite.repository";
import EncryptArgon from "../../users/infrastructure/Encrypt.argon";

const tokenService = new TokenJwt();
const userRepository = new UserSqliteRepository();
const encryptMethod = new EncryptArgon();

export const authLoginUseCase = new AuthLoginUseCase(userRepository, encryptMethod, tokenService);
export const authMiddleware = new AuthMiddleware(tokenService);
