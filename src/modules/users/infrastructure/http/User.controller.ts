import ControllerBuilder from "../../../../share/functions/ControllerBuilder";
import {userCreateUseCase, userDetailUseCase, userListUseCase} from "../../config/di.container";
import CreateUserDto from "../../application/dto/CreateUser.dto";

export const UserListController = ControllerBuilder(({user}) => {
    return userListUseCase.execute(user!.rol)
})

export const UserDetailController = ControllerBuilder(({params, user}) => {
    const id = params.id as string
    return userDetailUseCase.execute(id, user!.sub.toString())
})

export const UserCreateController = ControllerBuilder(({body, user}, res) => {
    res.statusCode = 201
    return userCreateUseCase.execute(new CreateUserDto(body), user!.rol)
})