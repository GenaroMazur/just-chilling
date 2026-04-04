import {Router} from "express";
import ControllerBuilder from "../../share/functions/ControllerBuilder";
import authRoute from "../../modules/auth/infrastructure/http/Auth.route";
import {authMiddleware} from "../../modules/auth/config/di.container";
import UserRoute from "../../modules/users/infrastructure/http/User.route";
import swaggerRouter from "./swagger";


const indexRoute = Router();

indexRoute.use("/docs", swaggerRouter)

indexRoute.get("/", ControllerBuilder(() => {
    return "Hello World!"
}));

indexRoute.use("/auth", authRoute)

indexRoute.use(authMiddleware.handle.bind(authMiddleware))

indexRoute.use("/user", UserRoute)

export default indexRoute;
