import { customerRegistrationRequestSchema } from "@/services/server/modules/auth/schema";
import { withValidation } from "../../utils";
import { postCustomerRegistration } from "./post";

export const POST = withValidation({
  handler: postCustomerRegistration,
  schema: customerRegistrationRequestSchema,
});
