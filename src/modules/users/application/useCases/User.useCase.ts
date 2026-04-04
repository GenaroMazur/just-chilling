import UserRepository from "../../domain/interfaces/User.repository";

export default abstract class UserUseCase {
    constructor(protected readonly userRepository: UserRepository) {
    }
}