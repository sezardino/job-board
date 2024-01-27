import { AbstractController } from "@/services/server/helpers";
import { UserRoles } from "@prisma/client";
import { NextRequest } from "next/server";
import { CompaniesService } from "./companies.service";
import {
  AdminCompaniesResponse,
  CheckCompanyNameAvailableResponse,
  CompanyProfileResponse,
  EditCompanyResponse,
  MyCompanyBaseDataResponse,
  adminCompaniesRequestSchema,
  checkCompanyNameAvailableRequestSchema,
  editCompanyRequestSchema,
} from "./schema";

export class CompaniesController extends AbstractController<CompaniesService> {
  async admin(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams);

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
    const formData = await req.formData();
    const data = this.formatFormData(formData);

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
      console.log(error);
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async myCompanyProfile() {
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
      const res = await this.service.profile(session.user.companyId!);

      return this.getNextResponse(res as CompanyProfileResponse, 200);
    } catch (error) {
      console.log(error);
      return this.getNextResponse({ error }, 500);
    }
  }

  async myCompanyBaseData() {
    const { response, session } = await this.handlerHelper({
      acceptedRoles: [
        UserRoles.OWNER,
        UserRoles.MODERATOR,
        UserRoles.RECRUITER,
      ],
    });

    if (response) return response;

    if (!session)
      return this.getNextResponse(
        { message: "backend-errors.unauthorized" },
        401
      );

    try {
      const res = await this.service.baseData(session.user.companyId!);

      return this.getNextResponse(res as MyCompanyBaseDataResponse, 200);
    } catch (error) {
      console.log(error);
      return this.getNextResponse({ error }, 500);
    }
  }

  async checkNameAvailable(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams);

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: checkCompanyNameAvailableRequestSchema,
    });

    if (response) return response;

    try {
      const bllResponse = await this.service.checkNameAvailable(dto!.name!);

      return this.getNextResponse(
        { available: !bllResponse } as CheckCompanyNameAvailableResponse,
        200
      );
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
