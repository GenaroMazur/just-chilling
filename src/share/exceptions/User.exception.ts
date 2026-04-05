import SystemException from "./System.exception";

export default class UserException extends SystemException {
    code?: number
    constructor(message: string, body?: unknown) {
        super(message, body);
        this.name = "UserException";
    }
}
