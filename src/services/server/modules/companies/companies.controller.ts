import { AbstractController } from "@/services/server/helpers";
import { UserRoles } from "@prisma/client";
import { NextRequest } from "next/server";
import { CompaniesService } from "./companies.service";
import {
  AdminCompaniesResponse,
  EditCompanyResponse,
  MyCompanyResponse,
  adminCompaniesRequestSchema,
  editCompanyRequestSchema,
} from "./schema";

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

  async edit(req: NextRequest) {
    const data = await req.json();

    const { response, dto, session } = await this.handlerHelper({
      data,
      acceptedRoles: [UserRoles.OWNER],
      schema: editCompanyRequestSchema,
    });

    if (response) return response;

    try {
      const res = await this.service.edit(dto!, session?.user.companyId!);

      return this.getNextResponse(res as EditCompanyResponse, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async my() {
    const { response, session } = await this.handlerHelper({
      acceptedRoles: [UserRoles.OWNER],
    });

    if (response) return response;

    if (!session)
      return this.getNextResponse(
        { message: "backend-errors.unauthorized" },
        401
      );

    try {
      const res = await this.service.my(session.user.companyId!);

      return this.getNextResponse(res as MyCompanyResponse, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
