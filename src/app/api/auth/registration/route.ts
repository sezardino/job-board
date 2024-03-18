import { customerRegistrationRequestSchema } from "@/services/bll/modules/auth/schema";
import { withApiRouteHandler, withValidation } from "../../utils";
import { postCustomerRegistration } from "./post";

export const POST = withValidation({
  handler: withApiRouteHandler(
    postCustomerRegistration,
    "Cant register customer"
  ),
  schema: customerRegistrationRequestSchema,
});
