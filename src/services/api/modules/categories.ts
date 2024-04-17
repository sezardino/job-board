import {
  AdminCategoriesRequest,
  activeCategoriesResponseSchema,
  adminCategoriesResponseSchema,
} from "@/services/bll/modules/categories/schema";
import { AbstractApiModule } from "../helpers";

export class CategoriesApiModule extends AbstractApiModule {
  async adminList(params: AdminCategoriesRequest) {
    return await this.fetch({
      endpoint: "categories/admin",
      config: { params },
      schema: adminCategoriesResponseSchema,
    });
  }

  async activeCategories(industryId: string) {
    return await this.fetch({
      endpoint: `categories/${industryId}/active`,
      schema: activeCategoriesResponseSchema,
    });
  }
}
