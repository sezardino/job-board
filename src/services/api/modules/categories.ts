import { activeCategoriesResponseSchema } from "@/services/server/modules/categories/schema";
import { AbstractApiModule } from "../helpers";

export class CategoriesApiModule extends AbstractApiModule {
  async activeCategories(industryId: string) {
    return await this.fetch({
      endpoint: `categories/${industryId}/active`,
      schema: activeCategoriesResponseSchema,
    });
  }
}
