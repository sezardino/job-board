import { z } from "zod";

export const addApplicationNoteRequestSchema = z.object({
  content: z.string(),
});

export const addApplicationNoteResponseSchema = z.object({
  success: z.boolean(),
});

export type AddApplicationNoteRequest = z.infer<
  typeof addApplicationNoteRequestSchema
>;

export type AddApplicationNoteResponse = z.infer<
  typeof addApplicationNoteResponseSchema
>;
