import { MAX_STRING_LENGTH } from "@/const";
import { z } from "zod";

export enum CompanyRegistrationStatus {
  Success = "success",
  EmailUsed = "email-used",
  CompanyEmailUsed = "company-email-used",
  WaitingForEmailConfirmation = "waiting-for-email-confirmation",
}

export const companyRegistrationRequestSchema = z.object({
  owner: z.object({
    name: z
      .string({ required_error: "name is required" })
      .max(MAX_STRING_LENGTH, "max name length"),
    email: z
      .string({ required_error: "email is required" })
      .email("invalid email")
      .max(MAX_STRING_LENGTH, "max email length"),
    password: z
      .string()
      .min(6, "min password length")
      .max(MAX_STRING_LENGTH, "max password length"),
  }),
  company: z.object({
    name: z.string({ required_error: "company name is required" }),
    location: z.object({
      building: z.string({ required_error: "building is required" }),
      city: z.string({ required_error: "city is required" }),
      country: z.string({ required_error: "country is required" }),
      street: z.string({ required_error: "street is required" }),
      zipCode: z.string({ required_error: "zip code is required" }),
    }),
  }),
});

export const companyRegistrationResponseSchema = z.object({
  status: z.nativeEnum(CompanyRegistrationStatus),
});

export type CompanyRegistrationRequest = z.infer<
  typeof companyRegistrationRequestSchema
>;
export type CompanyRegistrationResponse = z.infer<
  typeof companyRegistrationResponseSchema
>;
