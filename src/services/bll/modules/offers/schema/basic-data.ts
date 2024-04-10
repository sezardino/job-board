import {
  JobContract,
  JobOperatingMode,
  JobType,
  OfferStatus,
  Seniority,
  SkillLevel,
} from "@prisma/client";
import { z } from "zod";

export const offerBasicDataResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  seniority: z.nativeEnum(Seniority),
  salaryFrom: z.number().nullable(),
  salaryTo: z.number().nullable(),
  contract: z.array(z.nativeEnum(JobContract)),
  operating: z.array(z.nativeEnum(JobOperatingMode)),
  skills: z.array(
    z.object({ name: z.string(), level: z.nativeEnum(SkillLevel) })
  ),
  status: z.nativeEnum(OfferStatus),
  type: z.nativeEnum(JobType),
  category: z.object({ name: z.string(), id: z.string() }),
  industry: z.object({ name: z.string(), id: z.string() }),
  _count: z.object({ applications: z.number() }),
});

export type OfferBasicDataResponse = z.infer<
  typeof offerBasicDataResponseSchema
>;
