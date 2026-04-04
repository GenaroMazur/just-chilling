import Core from "../../infrastructure/Core";

export default function CloseProcess(application: Core) {
    return async function (err?: unknown) {
        if (err) console.error(err);

        const exitCode = err ? 1 : 0;
        const forceClose = setTimeout(() => {
            process.exit(exitCode)
        }, 1500);

        try {
            await application.stop()
        } catch (e) {
            console.error(e)
        }

        clearTimeout(forceClose);
        process.exit(exitCode);
    }
}