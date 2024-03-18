import {
  createIndustryRequestSchema,
  deleteIndustryRequestSchema,
  updateIndustryRequestSchema,
} from "@/services/bll/modules/industries/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../utils";
import { deleteIndustry } from "./delete";
import { getActiveIndustries } from "./get";
import { patchUpdateIndustry } from "./patch";
import { postCreateIndustry } from "./post";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getActiveIndustries,
    "Cant get active industries"
  ),
});

export const POST = withValidation({
  handler: withApiRouteHandler(postCreateIndustry, "Cant create industry"),
  schema: createIndustryRequestSchema,
  role: [UserRoles.ADMIN],
});

export const DELETE = withValidation({
  handler: withApiRouteHandler(deleteIndustry, "Cant delete industry"),
  schema: deleteIndustryRequestSchema,
  role: [UserRoles.ADMIN],
});

export const PATCH = withValidation({
  handler: withApiRouteHandler(patchUpdateIndustry, "Cant update industry"),
  schema: updateIndustryRequestSchema,
  role: [UserRoles.ADMIN],
});
