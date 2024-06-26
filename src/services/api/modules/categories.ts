import {
  AdminCategoriesRequest,
  activeCategoriesResponseSchema,
  adminCategoriesResponseSchema,
  baseCategoryDataResponseSchema,
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

  async baseData(id: string) {
    return await this.fetch({
      endpoint: `categories/${id}`,
      schema: baseCategoryDataResponseSchema,
    });
  }

  async activeCategories(industryId: string) {
    return await this.fetch({
      endpoint: `categories/active`,
      schema: activeCategoriesResponseSchema,
      config: { params: { industryId } },
    });
  }
}
