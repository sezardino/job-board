import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import {
  acceptInviteRequestSchema,
  checkInviteTokenRequestSchema,
} from "@/services/bll/modules/users/schema";
import { getCheckInviteToken } from "./get";
import { postAcceptInvite } from "./post";

export const GET = withValidation({
  handler: withApiRouteHandler(getCheckInviteToken, "Cant check invite token"),
  schema: checkInviteTokenRequestSchema,
  role: "public-only",
});

export const POST = withValidation({
  handler: withApiRouteHandler(postAcceptInvite, "Cant accept invite"),
  schema: acceptInviteRequestSchema,
  role: "public-only",
});
