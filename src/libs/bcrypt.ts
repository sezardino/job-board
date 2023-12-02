import { compare, genSaltSync, hash } from "bcrypt";

export class BcryptJs {
  salt: string;

  constructor(saltRounds: number) {
    this.salt = genSaltSync(saltRounds);
  }

  async hash(value: string) {
    return hash(value, this.salt);
  }

  async compare(value: string, hash: string) {
    return compare(value, hash);
  }
}
