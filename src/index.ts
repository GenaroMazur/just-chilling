import "reflect-metadata"
import "dotenv/config"

import Core from "./infrastructure/Core";
import CloseProcess from "./share/functions/CloseProcess";
import SystemException from "./share/exceptions/System.exception";
import Server from "./infrastructure/Server";
import indexRoute from "./infrastructure/http/index.route";
import NotFoundController from "./infrastructure/http/NotFound.controller";
import ErrorController from "./infrastructure/http/Error.controller";
import Database from "./infrastructure/database/Database";
import datasource from "./infrastructure/database/Datasource";

const core = Core.instance

const TCP_PORT = process.env.TCP_PORT
if (!TCP_PORT) throw new SystemException("TCP_PORT is not defined in .env file")

const server = new Server(Number(TCP_PORT))

core.server = server

server.application.use(indexRoute)
server.application.use(NotFoundController)
server.application.use(ErrorController)

core.database = new Database(datasource)

core.start().catch(CloseProcess(core))

// graceful shutdown
process.on('SIGINT', CloseProcess(core))
process.on('SIGTERM', CloseProcess(core))
process.on('unhandledRejection', CloseProcess(core))
process.on('uncaughtException', CloseProcess(core))