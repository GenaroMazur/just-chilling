import {Router} from "express";
import {UserCreateController, UserDetailController, UserListController} from "./User.controller";

const UserRoute = Router()

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
UserRoute.get("/", UserListController)

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserDto'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
UserRoute.post("/", UserCreateController)

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtener detalle de un usuario
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
UserRoute.get("/:id", UserDetailController)

export default UserRoute