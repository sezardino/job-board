import { fileSchema } from "@/types";
import { z } from "zod";

export const myCompanyBaseDataResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  catchPhrase: z.string().nullable(),
  logo: fileSchema.nullable(),
});

export type MyCompanyBaseDataResponse = z.infer<
  typeof myCompanyBaseDataResponseSchema
>;
