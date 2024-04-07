import { MAX_STRING_LENGTH } from "@/const";
import { SkillLevel } from "@prisma/client";
import { z } from "zod";

export const editOfferRequestSchema = z.object({
  skills: z
    .array(
      z.object({
        name: z
          .string({ required_error: "skills.name.required" })
          .max(
            MAX_STRING_LENGTH,
            `max string length is ${MAX_STRING_LENGTH} characters.`
          ),
        level: z.nativeEnum(SkillLevel, {
          required_error: "skill level is required",
        }),
      })
    )
    .optional(),
  description: z
    .string({
      required_error: "description.field.required",
    })
    .min(50, "min string length is 50 characters.")
    .max(1000, "max string length is 1000 characters.")
    .optional(),
});

export const editOfferResponseSchema = z.object({
  status: z.boolean(),
});

export type EditOfferRequest = z.infer<typeof editOfferRequestSchema>;
export type EditOfferResponse = z.infer<typeof editOfferResponseSchema>;
