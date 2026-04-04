import EncryptServiceInterface from "../domain/interfaces/encrypt.service.interface";
import {hash, verify} from "argon2"

export default class EncryptArgon implements EncryptServiceInterface {
    async encrypt(text: string): Promise<string> {
        return await hash(text)
    }

    async compare(text: string, hash: string): Promise<boolean> {
        return await verify(hash, text)
    }

}