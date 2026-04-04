import UserUseCase from "./User.useCase";
import UserNotFound from "../../domain/exceptions/User.notFound";
import {RolEnum} from "../../domain/enums/Rol.enum";
import ForbiddenException from "../../../../share/exceptions/Forbidden.exception";

export default class UserDeleteUseCase extends UserUseCase {
    async execute(id: string, currentUserId: string) {
        const [currentUser, user] = await Promise.all([
            this.userRepository.findById(currentUserId),
            this.userRepository.findById(id)
        ])

        if (!currentUser || !user) throw new UserNotFound()

        if (currentUser.rol !== RolEnum.ADMIN && currentUser.id !== user.id) throw new ForbiddenException()

        await this.userRepository.delete(id)
    }
}