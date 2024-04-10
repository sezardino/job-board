import { ApplicationStatus } from "@prisma/client";
import { z } from "zod";

export const oneApplicationResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  message: z.string(),
  dataProcessing: z.boolean(),
  futureRecruitment: z.boolean(),
  status: z.nativeEnum(ApplicationStatus),
  rejectedReason: z.string().nullable(),
  curriculumVitae: z.object({ id: z.string(), url: z.string() }),
  createdAt: z.string(),
  updatedAt: z.string(),
  notes: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      content: z.string(),
      createdAt: z.string(),
      author: z.object({
        id: z.string(),
        name: z.string(),
        avatar: z.string(),
        email: z.string(),
      }),
    })
  ),
});

export type OneApplicationResponse = z.infer<
  typeof oneApplicationResponseSchema
>;
