import {EntitySchema} from "typeorm";
import User from "../../domain/entity/User";

export const UserPostgresEntity = new EntitySchema<User>({
    name: "User",
    target: User,
    columns: {
        id: {
            type: "integer",
            primary: true,
            generated: true,
        },
        rol: {
            type: "varchar",
        },
        username: {
            type: "varchar",
            unique: true,
        },
        password: {
            type: "varchar",
        },
        email: {
            type: "varchar",
            unique: true,
        },
        createdAt: {
            name: "created_at",
            type: "timestamp with time zone",
            createDate: true,
        },
        updatedAt: {
            name: "updated_at",
            type: "timestamp with time zone",
            updateDate: true,
        },
        deletedAt: {
            name: "deleted_at",
            type: "timestamp with time zone",
            nullable: true,
            deleteDate: true,
        },
    },
});
