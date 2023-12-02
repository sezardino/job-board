import { hash, verify } from "argon2";

export class Argon {
  constructor(private readonly secret: string) {}

  async hash(plainText: string) {
    return await hash(plainText, { secret: Buffer.from(this.secret) });
  }

  async compare(plain: string, hash: string) {
    return await verify(hash, plain, {
      secret: Buffer.from(this.secret),
    });
  }
}
