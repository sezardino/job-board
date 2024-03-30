import { skillValidationSchema } from "@/const/zod";
import { z } from "zod";

export const jobOfferEditionDataResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  skills: z.array(skillValidationSchema),
});

export type JobOfferEditionDataResponse = z.infer<
  typeof jobOfferEditionDataResponseSchema
>;
