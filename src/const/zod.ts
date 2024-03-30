import { SkillLevel } from "@prisma/client";
import { z } from "zod";
import { MAX_STRING_LENGTH } from ".";

export const skillValidationSchema = z.object({
  name: z
    .string({ required_error: "skills.name.required" })
    .max(
      MAX_STRING_LENGTH,
      `max string length is ${MAX_STRING_LENGTH} characters.`
    ),
  level: z.nativeEnum(SkillLevel, {
    required_error: "skill level is required",
  }),
});
