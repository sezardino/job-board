import {
  createIndustryRequestSchema,
  deleteIndustryRequestSchema,
  updateIndustryRequestSchema,
} from "@/services/bll/modules/industries/schema";
import { UserRoles } from "@prisma/client";
import { withValidation } from "../utils";
import { deleteIndustry } from "./delete";
import { getActiveIndustries } from "./get";
import { patchUpdateIndustry } from "./patch";
import { postCreateIndustry } from "./post";

export const GET = withValidation({
  handler: getActiveIndustries,
});

export const POST = withValidation({
  handler: postCreateIndustry,
  schema: createIndustryRequestSchema,
  role: [UserRoles.ADMIN],
});

export const DELETE = withValidation({
  handler: deleteIndustry,
  schema: deleteIndustryRequestSchema,
  role: [UserRoles.ADMIN],
});

export const PATCH = withValidation({
  handler: patchUpdateIndustry,
  schema: updateIndustryRequestSchema,
  role: [UserRoles.ADMIN],
});
