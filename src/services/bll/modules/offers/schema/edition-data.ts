import { skillValidationSchema } from "@/const/zod";
import { z } from "zod";

export const offerEditionDataResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  skills: z.array(skillValidationSchema),
});

export type OfferEditionDataResponse = z.infer<
  typeof offerEditionDataResponseSchema
>;
