import UserRepository from "../../domain/interfaces/User.repository";
import EncryptInterface from "../../domain/interfaces/encrypt.interface";

export default abstract class UserUseCase {
    constructor(protected readonly userRepository: UserRepository, protected readonly encryptMethod: EncryptInterface) {
    }
}