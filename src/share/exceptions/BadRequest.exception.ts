import UserException from "./User.exception";

export default class BadRequestException extends UserException {
    constructor(message: string) {
        super(message);
        this.name = "BadRequestException";
        this.code = 400;
        Object.setPrototypeOf(this, BadRequestException.prototype);
    }
}
