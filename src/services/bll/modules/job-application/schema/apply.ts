import { z } from "zod";

export const applyForJobOfferRequestSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }),
  message: z.string({ required_error: "Message is required" }),
  futureRecruitment: z.coerce.boolean(),
  dataProcessing: z.coerce.boolean(),
  jobOfferId: z.string(),
  curriculumVitae: z.string().or(z.any()),
});

export const applyForJobOfferResponseSchema = z.object({
  success: z.boolean(),
});

export type ApplyForJobOfferRequest = z.infer<
  typeof applyForJobOfferRequestSchema
>;
export type ApplyForJobOfferResponse = z.infer<
  typeof applyForJobOfferResponseSchema
>;
