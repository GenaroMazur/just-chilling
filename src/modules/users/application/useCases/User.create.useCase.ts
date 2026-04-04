import UserUseCase from "./User.useCase";
import CreateUserDto from "../dto/CreateUser.dto";
import {RolEnum} from "../../domain/enums/Rol.enum";
import ForbiddenException from "../../../../share/exceptions/Forbidden.exception";
import User from "../../domain/entity/User";
import UserValidationException from "../../domain/exceptions/User.validation.exception";

export default class UserCreateUseCase extends UserUseCase {
    async execute(createUserDto: CreateUserDto, currentUserRol: RolEnum) {
        if (currentUserRol !== RolEnum.ADMIN) throw new ForbiddenException()

        const user = new User()

        user.rol = createUserDto.rol
        user.username = createUserDto.username
        user.password = await this.encryptMethod.encrypt(createUserDto.password)
        user.email = createUserDto.email

        const [existsUsername, existsEmail] = await Promise.all([
            this.userRepository.findByUsername(createUserDto.username),
            this.userRepository.findByEmail(createUserDto.email)
        ])

        if (existsUsername) throw new UserValidationException("Username already exists")
        if (existsEmail) throw new UserValidationException("Email already exists")

        const saved = await this.userRepository.save(user)

        return {...saved, password: undefined}
    }
}