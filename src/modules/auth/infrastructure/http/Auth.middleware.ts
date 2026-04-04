import {NextFunction, Request, Response} from "express";
import UnauthorizedException from "../../../../share/exceptions/Unauthorized.exception";
import TokenServiceInterface from "../../domain/interfaces/Token.service.interface";

export default class AuthMiddleware {
    constructor(private readonly tokenService: TokenServiceInterface) {
    }

    public handle = (req: Request, _: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException("No token provided");
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            throw new UnauthorizedException("Token error");
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            throw new UnauthorizedException("Token malformatted");
        }

        try {
            const decoded = this.tokenService.verify(token);
            req.user = decoded;
            return next();
        } catch (err) {
            throw new UnauthorizedException("Token invalid");
        }
    };
}
