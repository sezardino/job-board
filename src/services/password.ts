import { Argon } from "@/libs/argon";

export const passwordService = new Argon(process.env.HASH_PASSWORD_SERCER!);
