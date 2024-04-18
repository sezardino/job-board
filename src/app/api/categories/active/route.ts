import { withApiRouteHandler, withValidation } from "@/app/api/utils";
import { activeCategoriesRequestSchema } from "@/services/bll/modules/categories/schema";
import { getActiveCategories } from "./get";

export const GET = withValidation({
  handler: withApiRouteHandler(
    getActiveCategories,
    "Cant get active categories"
  ),
  schema: activeCategoriesRequestSchema,
  input: "search",
});
