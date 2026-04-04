import jwt from "jsonwebtoken";
import TokenServiceInterface from "../domain/interfaces/Token.service.interface";

export default class TokenJwt implements TokenServiceInterface {
    private readonly secret: string;

    constructor() {
        this.secret = process.env.JWT_SECRET || "default_secret";
    }

    generate(payload: any): string {
        return jwt.sign({...payload}, this.secret);
    }

    verify(token: string): any {
        return jwt.verify(token, this.secret);
    }
}
