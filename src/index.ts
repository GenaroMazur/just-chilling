import "reflect-metadata"
import "dotenv/config"

import Core from "./infrastructure/Core";
import CloseProcess from "./share/functions/CloseProcess";
import SystemException from "./share/exceptions/System.exception";
import Server from "./infrastructure/Server";
import indexRoute from "./infrastructure/http/index.route";
import NotFoundController from "./infrastructure/http/NotFound.controller";
import ErrorController from "./infrastructure/http/Error.controller";

const core = Core.instance

const TCP_PORT = process.env.TCP_PORT
if (!TCP_PORT) throw new SystemException("TCP_PORT is not defined in .env file")

const server = new Server(Number(TCP_PORT))

core.server = server

server.application.use(indexRoute)
server.application.use(NotFoundController)
server.application.use(ErrorController)

import {UserEntity} from "./modules/users/infrastructure/sqlite/User.sqlite.entity";
import Database from "./infrastructure/database/Database";
import {DataSourceOptions} from "typeorm";

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

if (!DB_HOST) throw new SystemException("DB_HOST is not defined in .env file")
if (!DB_PORT) throw new SystemException("DB_PORT is not defined in .env file")
if (!DB_USERNAME) throw new SystemException("DB_USERNAME is not defined in .env file")
if (!DB_PASSWORD) throw new SystemException("DB_PASSWORD is not defined in .env file")

const DB_TYPE = process.env.DB_TYPE || "sqlite"
const dbOptions: DataSourceOptions = {
    type: DB_TYPE as any,
    database: process.env.DB_DATABASE || "database.sqlite",
    synchronize: process.env.DB_SYNCHRONIZE === "true",
    logging: process.env.DB_LOGGING === "true",
    entities: [UserEntity],
}
if (DB_TYPE !== "sqlite") {
    Object.assign(dbOptions, {
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USERNAME,
        password: DB_PASSWORD,
    })
}

core.database = new Database(dbOptions)

core.start().then(() => {
}).catch(CloseProcess(core))

// graceful shutdown
process.on('SIGINT', CloseProcess(core))
process.on('SIGTERM', CloseProcess(core))
process.on('unhandledRejection', CloseProcess(core))
process.on('uncaughtException', CloseProcess(core))