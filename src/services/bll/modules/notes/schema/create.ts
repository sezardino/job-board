import { z } from "zod";

export const createNoteRequestSchema = z.object({
  applicationId: z.string({ required_error: "Application ID is required" }),
  content: z.string({ required_error: "Content is required" }),
});

export const createNoteResponseSchema = z.object({
  success: z.boolean(),
});

export type CreateNoteRequest = z.infer<typeof createNoteRequestSchema>;

export type CreateNoteResponse = z.infer<typeof createNoteResponseSchema>;
