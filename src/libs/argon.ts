import { hash, verify } from "argon2";

export class Argon {
  constructor() {}

  async hash(plainText: string) {
    return await hash(plainText);
  }

  async compare(plain: string, hash: string) {
    return await verify(hash, plain);
  }
}
