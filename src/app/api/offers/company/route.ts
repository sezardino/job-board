import { currentCompanyOffersRequestSchema } from "@/services/bll/modules/offers/schema";
import { UserRoles } from "@prisma/client";
import { withApiRouteHandler, withValidation } from "../../utils";
import { getCurrentCompanyOffers } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(getCurrentCompanyOffers, "Cant get  offers"),
  role: [UserRoles.OWNER, UserRoles.MODERATOR, UserRoles.RECRUITER],
  schema: currentCompanyOffersRequestSchema,
  input: "search",
});
