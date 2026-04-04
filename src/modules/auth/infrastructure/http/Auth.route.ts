import {AuthLoginController} from "./Auth.controller";
import {Router} from "express";

const authRoute = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   id: number
 *                   rol: string
 *                   username: string
 *                   email: string
 */
authRoute.post("/login", AuthLoginController);

export default authRoute;
