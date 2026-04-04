export default class Core {
    private static _instance: Core;
    public static get instance(): Core {
        if (!Core._instance) {
            Core._instance = new Core();
        }
        return Core._instance;
    }

    private constructor() {
    }

    public async start() {
    }

    public async stop() {
    }
}