import UserUseCase from "./User.useCase";
import {RolEnum} from "../../domain/enums/Rol.enum";
import ForbiddenException from "../../../../share/exceptions/Forbidden.exception";

export default class UserListUseCase extends UserUseCase {
    async execute(currentUserRol: RolEnum) {
        if (currentUserRol !== RolEnum.ADMIN) throw new ForbiddenException()

        const users = await this.userRepository.findAll()

        return users.map(user => ({
            ...user,
            password: undefined
        }))
    }
}