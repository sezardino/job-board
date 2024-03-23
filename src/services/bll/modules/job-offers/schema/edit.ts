import { MAX_STRING_LENGTH } from "@/const";
import { SkillLevel } from "@prisma/client";
import { z } from "zod";

export const editJobOfferRequestSchema = z.object({
  skills: z.array(
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
  ),
  description: z
    .string({
      required_error: "description.field.required",
    })
    .min(50, "min string length is 50 characters.")
    .max(1000, "max string length is 1000 characters."),
});

export const editJobOfferResponseSchema = z.object({
  status: z.boolean(),
});

export type EditJobOfferRequest = z.infer<typeof editJobOfferRequestSchema>;
export type EditJobOfferResponse = z.infer<typeof editJobOfferResponseSchema>;
