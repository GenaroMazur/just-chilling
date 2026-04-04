import UserException from "./User.exception";

export default class ForbiddenException extends UserException {
    constructor(message?: string) {
        super(message || "Not authorized to access this resource");
        this.name = "ForbiddenException";
        this.code = 403;
        Object.setPrototypeOf(this, ForbiddenException.prototype);
    }
}