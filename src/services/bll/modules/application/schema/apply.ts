import { z } from "zod";

export const applyForOfferRequestSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }),
  message: z.string({ required_error: "Message is required" }),
  futureRecruitment: z.coerce.boolean(),
  dataProcessing: z.coerce.boolean(),
  offerId: z.string(),
  curriculumVitae: z.string().or(z.any()),
});

export const applyForOfferResponseSchema = z.object({
  success: z.boolean(),
});

export type ApplyForOfferRequest = z.infer<typeof applyForOfferRequestSchema>;
export type ApplyForOfferResponse = z.infer<typeof applyForOfferResponseSchema>;
