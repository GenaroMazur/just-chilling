import {RolEnum} from "../enums/Rol.enum";
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id: { type: 'number' }
 *         rol: { type: 'string' }
 *         username: { type: 'string' }
 *         email: { type: 'string' }
 *         createdAt: { type: 'string', format: 'date-time' }
 *         updatedAt: { type: 'string', format: 'date-time' }
 *         deletedAt: { type: 'string', format: 'date-time', nullable: true }
 */
export default class User {
    id: number
    rol: RolEnum
    username: string
    password: string
    email: string

    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}