import { AbstractController } from "@/services/server/helpers";
import { NextRequest } from "next/server";
import { CompaniesService } from "./companies.service";
import { adminCompaniesListRequestSchema } from "./schema/admin-list";

export class CompaniesController extends AbstractController<CompaniesService> {
  async adminList(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: adminCompaniesListRequestSchema,
    });

    if (response) return response;

    try {
      const res = await this.service.adminList(dto!);

      return this.getNextResponse(res, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
