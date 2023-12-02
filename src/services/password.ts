import { BcryptJs } from "@/libs/bcrypt";

export const passwordService = new BcryptJs(Number(process.env.SALT_ROUNDS)!);
