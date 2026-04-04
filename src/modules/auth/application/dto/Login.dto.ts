/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDto:
 *       type: 'object'
 *       required: ['username', 'password']
 *       properties:
 *         username: { type: 'string' }
 *         password: { type: 'string' }
 */
export default class LoginDto {
    username: string;
    password: string;

    constructor({username, password}: { username: string, password: string }) {
        this.username = username;
        this.password = password;
    }
}
