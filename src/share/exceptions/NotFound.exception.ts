import UserException from "./User.exception";

export default class NotFoundException extends UserException {
    constructor(message: string) {
        super(message);
        this.name = "NotFoundException";
        this.code = 404;
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}
