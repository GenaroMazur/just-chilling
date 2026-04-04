import LoginDto from "../dto/Login.dto";
import ForbiddenException from "../../../../share/exceptions/Forbidden.exception";
import UserRepository from "../../../users/domain/interfaces/User.repository";
import TokenServiceInterface from "../../domain/interfaces/Token.service.interface";
import EncryptServiceInterface from "../../../users/domain/interfaces/encrypt.service.interface";
import Token from "../../domain/entity/Token";
import {randomUUID} from "node:crypto";

export default class AuthLoginUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly encryptMethod: EncryptServiceInterface,
        private readonly tokenService: TokenServiceInterface
    ) {
    }

    async execute(loginDto: LoginDto) {
        const user = await this.userRepository.findByUsername(loginDto.username);

        if (!user) {
            throw new ForbiddenException("Invalid credentials");
        }

        const isPasswordValid = await this.encryptMethod.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new ForbiddenException("Invalid credentials");
        }

        const tokenObj = new Token()

        tokenObj.jti = randomUUID()
        tokenObj.sub = user.id
        tokenObj.rol = user.rol
        tokenObj.iat = Math.floor(Date.now() / 1000)
        tokenObj.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 1 day

        const token = this.tokenService.generate(tokenObj);

        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                rol: user.rol
            }
        };
    }
}
