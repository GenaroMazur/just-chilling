import Server from "./Server";
import Database from "./database/Database";

export default class Core {
    private static _instance: Core;
    public static get instance(): Core {
        if (!Core._instance) {
            Core._instance = new Core();
        }
        return Core._instance;
    }

    public server: Server | null = null
    public database: Database | null = null

    private constructor() {
    }

    public async start() {
        await this.database?.start();
        await this.server?.start();
    }

    public async stop() {
        await this.server?.stop();
        await this.database?.stop();
    }
}