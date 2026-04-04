import UserUseCase from "./User.useCase";
import UpdateUserDto from "../dto/UpdateUser.dto";
import ForbiddenException from "../../../../share/exceptions/Forbidden.exception";
import UserNotFound from "../../domain/exceptions/User.notFound";
import UserValidationException from "../../domain/exceptions/User.validation.exception";
import UserRepository from "../../domain/interfaces/User.repository";
import EncryptServiceInterface from "../../domain/interfaces/encrypt.service.interface";

export default class UserUpdateUseCase extends UserUseCase {
    constructor(userRepository: UserRepository, protected readonly encryptMethod: EncryptServiceInterface) {
        super(userRepository);
    }

    async execute(id: number, updateUserDto: UpdateUserDto, currentUserId: number) {
        if (currentUserId !== id)
            throw new ForbiddenException()


        const [user, existsEmail, existsUsername] = await Promise.all([
            this.userRepository.findById(id),
            updateUserDto.email ? this.userRepository.findByEmail(updateUserDto.email) : null,
            updateUserDto.username ? this.userRepository.findByUsername(updateUserDto.username) : null
        ])

        if (!user) throw new UserNotFound()

        if (updateUserDto.username) {
            if (existsUsername && existsUsername.id !== user.id) throw new UserValidationException(
                "Username already exists"
            )
            user.username = updateUserDto.username
        }

        if (updateUserDto.email) {
            if (existsEmail && existsEmail.id !== user.id) throw new UserValidationException(
                "Email already exists"
            )
            user.email = updateUserDto.email
        }

        if (updateUserDto.newPassword) {
            if (!updateUserDto.oldPassword) throw new UserValidationException("Old password is required")

            const isMatch = await this.encryptMethod.compare(updateUserDto.oldPassword, user.password)
            if (!isMatch) throw new UserValidationException("Old password is incorrect")

            if (updateUserDto.newPassword == updateUserDto.oldPassword) throw new UserValidationException("New password cannot be the same as the old password")
            user.password = await this.encryptMethod.encrypt(updateUserDto.newPassword)
        }

        user.updatedAt = new Date()

        const saved = await this.userRepository.save(user)
        return {
            ...saved,
            password: undefined
        }
    }
}