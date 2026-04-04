import {AuthLoginController} from "./Auth.controller";
import {Router} from "express";

const authRoute = Router();

authRoute.post("/login", AuthLoginController);

export default authRoute;
