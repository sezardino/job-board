import { withValidation } from "@/app/api/utils";
import { activeCategoriesRequestSchema } from "@/services/bll/modules/categories/schema";
import { getActiveCategories } from "./get";

// export const GET = (_: any, params: { params: ActiveCategoriesRequest }) =>
//   serverService.categories.controller.active(params);
export const GET = withValidation({
  handler: getActiveCategories,
  schema: activeCategoriesRequestSchema,
  input: "params",
});
