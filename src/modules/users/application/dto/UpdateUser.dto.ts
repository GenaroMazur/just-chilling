/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserDto:
 *       type: 'object'
 *       properties:
 *         username: { type: 'string' }
 *         newPassword: { type: 'string' }
 *         oldPassword: { type: 'string' }
 *         email: { type: 'string' }
 */
export default class UpdateUserDto {
    username?: string
    newPassword?: string
    oldPassword?: string
    email?: string

    constructor({username, newPassword, oldPassword, email}: UpdateUserDto) {
        this.username = username
        this.newPassword = oldPassword
        this.oldPassword = newPassword
        this.email = email
    }
}