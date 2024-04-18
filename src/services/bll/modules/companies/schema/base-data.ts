import { fileSchema } from "@/types";
import { z } from "zod";

export const companyBaseDataRequestSchema = z.object({
  companyId: z.string().optional(),
});

export const companyBaseDataResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slogan: z.string().nullable(),
  logo: fileSchema.nullable(),
});

export type CompanyBaseDataRequest = z.infer<
  typeof companyBaseDataRequestSchema
>;

export type CompanyBaseDataResponse = z.infer<
  typeof companyBaseDataResponseSchema
>;
