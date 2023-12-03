import { AbstractController } from "@/services/server/helpers";
import { UserRoles } from "@prisma/client";
import { NextRequest } from "next/server";
import { CompaniesService } from "./companies.service";
import { AdminCompaniesResponse, adminCompaniesRequestSchema } from "./schema";

export class CompaniesController extends AbstractController<CompaniesService> {
  async admin(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: adminCompaniesRequestSchema,
      acceptedRoles: [UserRoles.ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.admin(dto!);

      return this.getNextResponse(res as AdminCompaniesResponse, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
