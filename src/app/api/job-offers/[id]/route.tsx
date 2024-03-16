import { withValidation } from "../../utils";
import { getJobOffer } from "./get";

export const GET = withValidation({
  handler: getJobOffer,
});
