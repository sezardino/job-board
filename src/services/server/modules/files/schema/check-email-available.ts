import { z } from "zod";

export const checkEmailAvailableRequestSchema = z.object({
  emails: z.array(z.string().email()).min(1).max(20).optional(),
});

export const checkEmailAvailableResponseSchema = z.record(
  z.string(),
  z.boolean()
);

export type CheckEmailAvailableRequest = z.infer<
  typeof checkEmailAvailableRequestSchema
>;

export type CheckEmailAvailableResponse = z.infer<
  typeof checkEmailAvailableResponseSchema
>;
