import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const changeApplicationStatusRequestSchema = z
  .object({
    status: z.nativeEnum(ApplicationStatus),
    rejectedReason: z.string().optional(),
  })
  .refine(
    (data) =>
      data.status === ApplicationStatus.REJECTED && !data.rejectedReason
        ? false
        : true,
    "Rejected reason is required for rejected statuses"
  );

export const changeApplicationStatusResponseSchema = z.object({
  success: z.boolean(),
});

export type ChangeApplicationStatusRequest = z.infer<
  typeof changeApplicationStatusRequestSchema
>;

export type ChangeApplicationStatusResponse = z.infer<
  typeof changeApplicationStatusResponseSchema
>;
