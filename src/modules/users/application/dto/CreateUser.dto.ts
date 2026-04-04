import {RolEnum} from "../../domain/enums/Rol.enum";

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