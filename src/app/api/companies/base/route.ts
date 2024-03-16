import { UserRoles } from "@prisma/client";
import { withValidation } from "../../utils";
import { getMyCompanyBaseData } from "./get";

export const GET = withValidation({
  handler: getMyCompanyBaseData,
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
});
