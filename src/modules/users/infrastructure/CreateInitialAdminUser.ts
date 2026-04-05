import {userCreateUseCase, userListUseCase} from "../config/di.container";
import {RolEnum} from "../domain/enums/Rol.enum";
import {logger} from "../../../share/functions/logger";
import CreateUserDto from "../application/dto/CreateUser.dto";

export async function createInitialAdminUser() {
    const userList = await userListUseCase.execute(RolEnum.ADMIN)
    if (!userList.some(u => u.rol === RolEnum.ADMIN)) {

        const createUserDto = new CreateUserDto({
            username: "admin",
            password: "admin",
            rol: RolEnum.ADMIN,
            email: "admin@domain.com"
        })

        await userCreateUseCase.execute(createUserDto, RolEnum.ADMIN)
        logger.info("Creating initial admin user: admin / admin")
        logger.warn("Please change the password for security reasons")
    }
}