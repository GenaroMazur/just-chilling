import ControllerBuilder from "../../share/functions/ControllerBuilder";


const NotFoundController = ControllerBuilder((_, res) => {
    res.statusCode = 404;
    return "Not Found";
});


export default NotFoundController;
