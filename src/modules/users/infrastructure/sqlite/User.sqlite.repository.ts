import UserRepository from "../../domain/interfaces/User.repository";
import User from "../../domain/entity/User";
import Database from "../../../../infrastructure/database/Database";
import {UserEntity} from "./User.sqlite.entity";

export default class UserSqliteRepository implements UserRepository {
    private get repository() {
        return Database.connection.getRepository(UserEntity);
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.repository.findOneBy({username});
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOneBy({email});
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<User | null> {
        return await this.repository.findOneBy({id});
    }

    async save(entity: User): Promise<User> {
        return await this.repository.save(entity);
    }

    async delete(id: number): Promise<void>;
    async delete(entity: User): Promise<void>;
    async delete(t: number | User): Promise<void> {
        if (typeof t === "number") {
            await this.repository.softDelete(t);
        } else {
            await this.repository.softRemove(t);
        }
    }
}