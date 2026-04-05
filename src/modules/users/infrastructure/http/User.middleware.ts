import {body, param} from "express-validator";
import validationHandlerMiddleware from "../../../../share/http/validationHandlerMiddleware";
import {RolEnum} from "../../domain/enums/Rol.enum";

export const validateId = [param('id').isInt().withMessage('Invalid id'), validationHandlerMiddleware]

export const userCreateValidation = [
    body("username")
        .notEmpty().withMessage('Username is required').bail()
        .isString().withMessage('Username must be a string').bail()
        .isLength({min: 3, max: 20}).withMessage('Username must be between 3 and 20 characters').bail(),
    body("email")
        .notEmpty().withMessage('Email is required').bail()
        .isEmail().withMessage('Invalid email format').bail(),
    body("password")
        .notEmpty().withMessage('Password is required'),
    body("role")
        .notEmpty().withMessage('Role is required').bail()
        .isIn(Object.values(RolEnum)).withMessage('Invalid role, must be user or admin'),
    validationHandlerMiddleware
]

export const userUpdateValidation = [
    body("username")
        .optional().isString().withMessage('Username must be a string').bail()
        .isLength({min: 3, max: 20}).withMessage('Username must be between 3 and 20 characters').bail(),
    body("email")
        .optional().isEmail().withMessage('Invalid email format').bail(),
    body("newPassword")
        .optional().isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage('Password must be strong, at least 8 characters, 1 lowercase, 1 uppercase, 1 number and 1 symbol'),
    body("oldPassword")
        .notEmpty().withMessage('Old password is required'),
    validationHandlerMiddleware
]