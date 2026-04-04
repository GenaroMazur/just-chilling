import RepositoryInterface from "../../../../share/interfaces/Repository.interface";
import User from "../entity/User";

export default interface UserRepository extends RepositoryInterface<User, number> {
    findByUsername(username: string): Promise<User | null>;

    findByEmail(email: string): Promise<User | null>;

    findAll(): Promise<User[]>
}