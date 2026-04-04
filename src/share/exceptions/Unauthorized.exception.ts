import UserException from "./User.exception";

export default class UnauthorizedException extends UserException {
    constructor(message: string) {
        super(message);
        this.name = "UnauthorizedException";
        this.code = 401;
        Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
}