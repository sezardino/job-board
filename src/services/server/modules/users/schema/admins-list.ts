import { paginatedRequestSchema, paginatedResponseSchema } from "@/types";
import { z } from "zod";

export const adminsListRequestSchema = z
  .object({})
  .merge(paginatedRequestSchema);

export const adminsListResponseSchema = z
  .object({
    admins: z.array(
      z.object({
        email: z.string(),
        status: z.string(),
        id: z.string(),
        role: z.string(),
      })
    ),
  })
  .merge(paginatedResponseSchema);

export type AdminsListRequest = z.infer<typeof adminsListRequestSchema>;

export type AdminsListResponse = z.infer<typeof adminsListResponseSchema>;
