import BadRequestException from "../../../../share/exceptions/BadRequest.exception";

export default class UserValidationException extends BadRequestException {
    constructor(err: string) {
        super(`Error validating user: ${err}`);
    }
}