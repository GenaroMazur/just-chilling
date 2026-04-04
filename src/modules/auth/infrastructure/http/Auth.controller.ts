import ControllerBuilder from "../../../../share/functions/ControllerBuilder";
import LoginDto from "../../application/dto/Login.dto";
import {authLoginUseCase} from "../../config/di.container";

export const AuthLoginController = ControllerBuilder(async ({body}) => {
    return await authLoginUseCase.execute(new LoginDto(body));
})
