import NotFoundException from "../../../../share/exceptions/NotFound.exception";

export default class UserNotFound extends NotFoundException {
    constructor() {
        super("User not found");
    }
}