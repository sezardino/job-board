import { MAX_STRING_LENGTH } from "@/const";
import { z } from "zod";

export const createNoteRequestSchema = z.object({
  applicationId: z.string({ required_error: "Application ID is required" }),
  name: z.string({ required_error: "Name is required" }).max(MAX_STRING_LENGTH),
  content: z
    .string({ required_error: "Content is required" })
    .max(MAX_STRING_LENGTH),
});

export const createNoteResponseSchema = z.object({
  success: z.boolean(),
});

export type CreateNoteRequest = z.infer<typeof createNoteRequestSchema>;

export type CreateNoteResponse = z.infer<typeof createNoteResponseSchema>;
