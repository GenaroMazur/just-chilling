import {Errback, NextFunction, Response} from "express";
import {logger} from "../../share/functions/logger";
import UserException from "../../share/exceptions/User.exception";
import NotFoundException from "../../share/exceptions/NotFound.exception";
import SystemException from "../../share/exceptions/System.exception";

const ErrorController = (
    err: Errback | any,
    _: unknown,
    res: Response,
    next: NextFunction
) => {
    const NODE_ENV = process.env.NODE_ENV?.toLowerCase() == "development";

    if (res.headersSent) {
        logger.error(err);
        return next(err);
    }

    if (err.status === 400 && err.type === "entity.parse.failed")
        return res.status(400).send({message: "Invalid JSON payload passed."});

    if (err instanceof UserException) {
        if (err instanceof NotFoundException) {
            return res.status(404).send({message: "Not Found"});
        } else {
            return res.status(err.code || 400).send({message: err.message});
        }
    } else if (err instanceof SystemException) {
        logger.warning(err);
        return res.status(500).send({
            error: NODE_ENV ? err.message : "Internal server error.",
            stack: NODE_ENV ? err.stack : undefined
        })
    }

    logger.error(err);
    res.status(500).send({
        error: NODE_ENV ? err.message : "Internal server error.",
        stack: NODE_ENV ? err.stack : undefined
    })
};

export default ErrorController;