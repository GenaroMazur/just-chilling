import {validationResult} from "express-validator";
import ControllerBuilder from "../functions/ControllerBuilder";
import BadRequestException from "../exceptions/BadRequest.exception";

const validationHandlerMiddleware = ControllerBuilder(async (req, _, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    next(new BadRequestException("Validation Error", {errors:errors.mapped()}))
});

export default validationHandlerMiddleware;
