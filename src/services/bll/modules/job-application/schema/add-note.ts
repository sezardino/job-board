import { z } from "zod";

export const addJobApplicationNoteRequestSchema = z.object({
  content: z.string(),
});

export const addJobApplicationNoteResponseSchema = z.object({
  success: z.boolean(),
});

export type AddJobApplicationNoteRequest = z.infer<
  typeof addJobApplicationNoteRequestSchema
>;

export type AddJobApplicationNoteResponse = z.infer<
  typeof addJobApplicationNoteResponseSchema
>;
