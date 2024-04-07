import { JobApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const changeJobApplicationStatusRequestSchema = z
  .object({
    status: z.nativeEnum(JobApplicationStatus),
    rejectedReason: z.string().optional(),
  })
  .refine(
    (data) =>
      data.status === JobApplicationStatus.REJECTED && !data.rejectedReason
        ? false
        : true,
    "Rejected reason is required for rejected statuses"
  );

export const changeJobApplicationStatusResponseSchema = z.object({
  success: z.boolean(),
});

export type ChangeJobApplicationStatusRequest = z.infer<
  typeof changeJobApplicationStatusRequestSchema
>;

export type ChangeJobApplicationStatusResponse = z.infer<
  typeof changeJobApplicationStatusResponseSchema
>;
