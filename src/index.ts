import "dotenv/config"

import Core from "./infrastructure/Core";
import CloseProcess from "./share/functions/CloseProcess";
import SystemException from "./share/exceptions/System.exception";
import Server from "./infrastructure/Server";

const core = Core.instance

const TCP_PORT = process.env.TCP_PORT
if (!TCP_PORT) throw new SystemException("TCP_PORT is not defined in .env file")

const server = new Server(Number(TCP_PORT))

core.server = server

core.start().then(() => {
}).catch(CloseProcess(core))

// graceful shutdown
process.on('SIGINT', CloseProcess(core))
process.on('SIGTERM', CloseProcess(core))
process.on('unhandledRejection', CloseProcess(core))
process.on('uncaughtException', CloseProcess(core))