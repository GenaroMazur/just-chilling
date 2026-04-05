import {DataSourceOptions} from "typeorm";
import {UserEntity} from "../../modules/users/infrastructure/sqlite/User.sqlite.entity";
import SystemException from "../../share/exceptions/System.exception";

const DB_TYPE = process.env.DB_TYPE || "sqlite"
const dbOptions: DataSourceOptions = {
    type: DB_TYPE as any,
    database: process.env.DB_DATABASE || "database.sqlite", // sqlite, postgres, mysql, mariadb, etc.
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",
    entities: [UserEntity],
}
if (DB_TYPE !== "sqlite") {
    const DB_HOST = process.env.DB_HOST
    const DB_PORT = process.env.DB_PORT
    const DB_USERNAME = process.env.DB_USERNAME
    const DB_PASSWORD = process.env.DB_PASSWORD

    if (!DB_HOST) throw new SystemException("DB_HOST is not defined in .env file")
    if (!DB_PORT) throw new SystemException("DB_PORT is not defined in .env file")
    if (!DB_USERNAME) throw new SystemException("DB_USERNAME is not defined in .env file")
    if (!DB_PASSWORD) throw new SystemException("DB_PASSWORD is not defined in .env file")

    Object.assign(dbOptions, {
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
    })
}

export default dbOptions