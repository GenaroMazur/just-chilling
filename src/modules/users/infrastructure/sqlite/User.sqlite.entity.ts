import {EntitySchema} from "typeorm";
import User from "../../domain/entity/User";

export const UserEntity = new EntitySchema<User>({
    name: "User",
    target: User,
    columns: {
        id: {
            type: Number,
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
            type: "datetime",
            createDate: true,
        },
        updatedAt: {
            name: "updated_at",
            type: "datetime",
            updateDate: true,
        },
        deletedAt: {
            name: "deleted_at",
            type: "datetime",
            nullable: true,
            deleteDate: true,
        },
    },
});
