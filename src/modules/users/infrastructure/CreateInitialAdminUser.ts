import {userSqliteRepository} from "../config/di.container";
import User from "../domain/entity/User";
import {RolEnum} from "../domain/enums/Rol.enum";
import {logger} from "../../../share/functions/logger";
import EncryptArgon from "./Encrypt.argon";

export async function createInitialAdminUser() {
    const userList = await userSqliteRepository.findAll()
    if (userList.length === 0) {
        const initialUser = new User()

        initialUser.username = "admin"
        initialUser.email = "admin@domain.com"
        initialUser.password = await new EncryptArgon().encrypt("admin")
        initialUser.rol = RolEnum.ADMIN

        logger.info("Creating initial user: admin / admin")
        logger.warn("Please change the password for security reasons")
        await userSqliteRepository.save(initialUser)
    }
}