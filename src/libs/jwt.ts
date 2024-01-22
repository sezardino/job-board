import jwt, { VerifyErrors } from "jsonwebtoken";

export type JWTError = VerifyErrors;

export class JWT {
  generate<T extends Record<string, any>>(
    payload: T,
    secret: string,
    expiresIn: number
  ) {
    return jwt.sign(payload, secret, { expiresIn });
  }

  verify<T extends Record<string, any>>(
    token: string,
    secret: string
  ): T | null {
    const decoded = jwt.verify(token, secret);

    return decoded as T;
  }
}
