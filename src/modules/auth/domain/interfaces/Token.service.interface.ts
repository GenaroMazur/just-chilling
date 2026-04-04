import Token from "../entity/Token";

export default interface TokenServiceInterface {
    generate(payload: Token): string;

    verify(token: string): Token;
}
