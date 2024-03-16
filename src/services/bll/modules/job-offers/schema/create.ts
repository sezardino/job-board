import { MAX_STRING_LENGTH } from "@/const";
import {
  JobContract,
  JobOperatingMode,
  JobType,
  Seniority,
  SkillLevel,
} from "@prisma/client";
import { z } from "zod";

export const createJobOfferRequestSchema = z.object({
  name: z.string({ required_error: "name is required" }).max(MAX_STRING_LENGTH),
  industry: z.string({ required_error: "industry is required" }),
  category: z.string({ required_error: "category is required" }),
  salary: z
    .object({
      from: z
        .number({
          required_error: "salary from is required",
        })
        .positive("salary should be positive"),
      to: z
        .number({
          required_error: "salary to is required",
        })
        .positive("salary should be positive"),
    })
    .nullable()
    .refine((value) => (value ? value.from <= value.to : true), {
      path: ["to"],
      message: "salary to should be greater than salary from",
    }),
  type: z.nativeEnum(JobType, {
    required_error: "job type is required",
  }),
  contract: z.array(
    z.nativeEnum(JobContract, {
      required_error: "contract is required",
    }),
    { required_error: "contract is required" }
  ),
  operating: z.array(
    z.nativeEnum(JobOperatingMode, {
      required_error: "operating mode is required",
    })
  ),
  seniority: z.nativeEnum(Seniority, {
    required_error: "seniority is required",
  }),
  skills: z.array(
    z.object({
      name: z
        .string({ required_error: "skills.name.required" })
        .max(
          MAX_STRING_LENGTH,
          `max string length is ${MAX_STRING_LENGTH} characters.`
        ),
      level: z.nativeEnum(SkillLevel, {
        required_error: "skill level is required",
      }),
    })
  ),
  description: z
    .string({
      required_error: "description.field.required",
    })
    .min(50, "min string length is 50 characters.")
    .max(1000, "max string length is 1000 characters."),
});

export const createJobOfferResponseSchema = z.object({
  status: z.boolean(),
});

export type CreateJobOfferRequest = z.infer<typeof createJobOfferRequestSchema>;
export type CreateJobOfferResponse = z.infer<
  typeof createJobOfferResponseSchema
>;
