import {RolEnum} from "../enums/Rol.enum";

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