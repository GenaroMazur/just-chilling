import {Router} from "express";
import ControllerBuilder from "../../share/functions/ControllerBuilder";


const indexRoute = Router();

indexRoute.get("/", ControllerBuilder(() => {
    return "Hello World!"
}));

export default indexRoute;
