import {Router} from "express";
import ControllerBuilder from "../../share/functions/ControllerBuilder";
import authRoute from "../../modules/auth/infrastructure/http/Auth.route";
import {authMiddleware} from "../../modules/auth/config/di.container";


const indexRoute = Router();

indexRoute.get("/", ControllerBuilder(() => {
    return "Hello World!"
}));

indexRoute.use("/auth", authRoute)

indexRoute.use(authMiddleware.handle.bind(authMiddleware))


export default indexRoute;
