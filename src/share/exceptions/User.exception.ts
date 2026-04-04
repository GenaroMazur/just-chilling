import SystemException from "./System.exception";

export default class UserException extends SystemException {
    code?: number

    constructor(message: string) {
        super(message);
        this.name = "UserException";
    }
}
