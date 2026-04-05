import UserRepository from "../../domain/interfaces/User.repository";
import User from "../../domain/entity/User";
import Database from "../../../../infrastructure/database/Database";
import {UserPostgresEntity} from "./User.postgres.entity";

export default class UserPostgresRepository implements UserRepository {
    private get repository() {
        return Database.connection.getRepository(UserPostgresEntity);
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

    async findById(id: string): Promise<User | null> {
        return await this.repository.findOneBy({id: Number(id)});
    }

    async save(entity: User): Promise<User> {
        return await this.repository.save(entity);
    }

    async delete(id: string): Promise<void>;
    async delete(entity: User): Promise<void>;
    async delete(t: string | User): Promise<void> {
        if (typeof t === "string") {
            await this.repository.softDelete(Number(t));
        } else {
            await this.repository.softRemove(t);
        }
    }
}
