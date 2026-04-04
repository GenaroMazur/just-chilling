import {DataSource, DataSourceOptions} from "typeorm";
import {logger} from "../../share/functions/logger";

export default class Database {
    private static _instance: DataSource | null = null;

    constructor(private readonly options: DataSourceOptions) {
    }

    public async start(): Promise<void> {
        if (Database._instance) return;

        Database._instance = new DataSource(this.options);
        await Database._instance.initialize();
        logger.info(`Database connected with type: ${this.options.type}`);
    }

    public async stop(): Promise<void> {
        if (Database._instance && Database._instance.isInitialized) {
            await Database._instance.destroy();
            Database._instance = null;
            logger.info("Database connection closed");
        }
    }

    public static get connection(): DataSource {
        if (!Database._instance) {
            throw new Error("Database not initialized");
        }
        return Database._instance;
    }
}
