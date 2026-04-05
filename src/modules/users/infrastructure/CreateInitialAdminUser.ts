import {userCreateUseCase, userListUseCase} from "../config/di.container";
import {RolEnum} from "../domain/enums/Rol.enum";
import {logger} from "../../../share/functions/logger";
import CreateUserDto from "../application/dto/CreateUser.dto";

export async function createInitialAdminUser() {
    const userList = await userListUseCase.execute(RolEnum.ADMIN)
    if (!userList.some(u => u.rol === RolEnum.ADMIN)) {

        const username = process.env.INITIAL_ADMIN_USERNAME || "admin"
        const password = process.env.INITIAL_ADMIN_PASSWORD || "admin"
        const email = process.env.INITIAL_ADMIN_EMAIL || "admin@domain.com"

        const createUserDto = new CreateUserDto({
            username,
            password,
            rol: RolEnum.ADMIN,
            email
        })

        await userCreateUseCase.execute(createUserDto, RolEnum.ADMIN)
        logger.info(`Creating initial admin user: ${username} / ${password}`)
        logger.warn("Please change the password for security reasons")
    }
}