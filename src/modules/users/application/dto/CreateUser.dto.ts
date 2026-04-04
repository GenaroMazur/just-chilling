import {RolEnum} from "../../domain/enums/Rol.enum";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDto:
 *       type: 'object'
 *       required: ['rol', 'username', 'password', 'email']
 *       properties:
 *         rol: { type: 'string' }
 *         username: { type: 'string' }
 *         password: { type: 'string' }
 *         email: { type: 'string' }
 */
export default class CreateUserDto {
    rol: RolEnum
    username: string
    password: string
    email: string

    constructor({rol, username, password, email}: CreateUserDto) {
        this.rol = rol
        this.username = username
        this.password = password
        this.email = email
    }
}