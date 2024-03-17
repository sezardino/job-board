import { checkEmailAvailableRequestSchema } from "@/services/bll/modules/users/schema";
import { withValidation } from "../../utils";
import { getEmailAvailable } from "./get";

export const GET = withValidation({
  handler: getEmailAvailable,
  schema: checkEmailAvailableRequestSchema,
  input: "search",
});
