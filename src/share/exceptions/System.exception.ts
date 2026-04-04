export default class SystemException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "systemException";
        Object.setPrototypeOf(this, SystemException.prototype);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, SystemException);
        }
    }
}
