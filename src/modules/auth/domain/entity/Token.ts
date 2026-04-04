import {RolEnum} from "../../../users/domain/enums/Rol.enum";

export default class Token {
    jti: string;
    iat: number;
    exp: number;
    sub: number;
    rol: RolEnum
}