import Token from "../src/modules/auth/domain/entity/Token";

declare module "express" {

    export interface Request {
        user?: Token;
    }
}
