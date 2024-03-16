import { currentCompanyJobOffersRequestSchema } from "@/services/server/modules/job-offers/schema";
import { UserRoles } from "@prisma/client";
import { withValidation } from "../../utils";
import { getCurrentCompanyJobOffers } from "./get";

export const GET = withValidation({
  handler: getCurrentCompanyJobOffers,
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
  schema: currentCompanyJobOffersRequestSchema,
  input: "search",
});
