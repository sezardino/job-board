import { AbstractController } from "@/services/server/helpers";
import { CategoriesService } from "./categories.service";
import {
  ActiveCategoriesRequest,
  activeCategoriesRequestSchema,
  ActiveCategoriesResponse,
} from "./schema";

export class CategoriesController extends AbstractController<CategoriesService> {
  async active(data: { params: ActiveCategoriesRequest }) {
    const { dto, response, session } = await this.handlerHelper({
      data: data.params,
      schema: activeCategoriesRequestSchema,
    });
    if (response) return response;
    try {
      const res = await this.service.activeList(dto?.industry!);
      return this.getNextResponse(res as ActiveCategoriesResponse, 200);
    } catch (error) {
      console.log(error);
      return this.getNextResponse({ error }, 500);
    }
  }
}
