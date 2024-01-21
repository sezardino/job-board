import { Argon } from "@/libs/argon";

export const passwordService = new Argon(process.env.HASH_PASSWORD_SERCER!);
export const getHashService = (key: string) => new Argon(key);
