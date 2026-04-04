import ForbiddenException from "../../../../share/exceptions/Forbidden.exception";
import UserUseCase from "./User.useCase";
import UserNotFound from "../../domain/exceptions/User.notFound";

export default class UserDetailUseCase extends UserUseCase {
    async execute(id: string, currentUserId: string) {
        if (currentUserId !== id) throw new ForbiddenException()

        const user = await this.userRepository.findById(id)
        if (!user) throw new UserNotFound()

        return {
            ...user,
            password: undefined
        }
    }
}