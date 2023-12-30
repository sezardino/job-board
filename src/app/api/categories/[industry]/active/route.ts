import { serverService } from "@/services/server";
import { ActiveCategoriesRequest } from "@/services/server/modules/categories/schema";

export const GET = (_: any, params: { params: ActiveCategoriesRequest }) =>
  serverService.categories.controller.active(params);
