import "dotenv/config"

import Core from "./infrastructure/Core";
import CloseProcess from "./share/functions/CloseProcess";

const core = Core.instance

core.start().then(() => {
}).catch(CloseProcess(core))

// graceful shutdown
process.on('SIGINT', CloseProcess(core))
process.on('SIGTERM', CloseProcess(core))
process.on('unhandledRejection', CloseProcess(core))
process.on('uncaughtException', CloseProcess(core))