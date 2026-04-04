import "reflect-metadata"
import "dotenv/config"

import Core from "./infrastructure/Core";
import SystemException from "./share/exceptions/System.exception";

const core = Core.instance

import Database from "./infrastructure/database/Database";
import datasource from "./infrastructure/database/Datasource";

core.database = new Database(datasource)

const TCP_PORT = process.env.TCP_PORT
if (!TCP_PORT) throw new SystemException("TCP_PORT is not defined in .env file")

import Server from "./infrastructure/Server";

const server = new Server(Number(TCP_PORT))

core.server = server

import indexRoute from "./infrastructure/http/index.route";
import NotFoundController from "./infrastructure/http/NotFound.controller";
import ErrorController from "./infrastructure/http/Error.controller";

server.application.use(indexRoute)
server.application.use(NotFoundController)
server.application.use(ErrorController)


import {createInitialAdminUser} from "./modules/users/infrastructure/CreateInitialAdminUser";
import CloseProcess from "./share/functions/CloseProcess";

core.start().then(async () => {
    await createInitialAdminUser();
}).catch(CloseProcess(core))

// graceful shutdown
process.on('SIGINT', CloseProcess(core))
process.on('SIGTERM', CloseProcess(core))
process.on('unhandledRejection', CloseProcess(core))
process.on('uncaughtException', CloseProcess(core))