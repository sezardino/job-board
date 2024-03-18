import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getMyCompanyBaseData } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getMyCompanyBaseData,
    "Cant get company base data"
  ),
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
});
