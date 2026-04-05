import ControllerBuilder from "../../../../share/functions/ControllerBuilder";
import {
    userCreateUseCase,
    userDeleteUseCase,
    userDetailUseCase,
    userListUseCase,
    userUpdateUseCase
} from "../../config/di.container";
import CreateUserDto from "../../application/dto/CreateUser.dto";
import UpdateUserDto from "../../application/dto/UpdateUser.dto";

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

export const UserUpdateController = ControllerBuilder(({body, params, user}) => {
    const id = params.id as string
    return userUpdateUseCase.execute(id, new UpdateUserDto(body), user!.sub.toString())
})

export const UserDeleteController = ControllerBuilder(({params, user}) => {
    const id = params.id as string
    return userDeleteUseCase.execute(id, user!.sub.toString())
})