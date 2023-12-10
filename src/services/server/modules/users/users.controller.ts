import { AbstractController } from "@/services/server/helpers";
import { UserRoles } from "@prisma/client";
import { NextRequest } from "next/server";
import {
  AdminUsersResponse,
  CheckEmailAvailableResponse,
  CompaniesUsersResponse,
  CustomerUsersResponse,
  InviteAdminResponse,
  adminUsersRequestSchema,
  checkEmailAvailableRequestSchema,
  companiesUsersRequestSchema,
  customerUsersRequestSchema,
  inviteAdminRequestSchema,
} from "./schema";
import { UsersService } from "./users.service";

export class UsersController extends AbstractController<UsersService> {
  async checkEmailAvailable(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: checkEmailAvailableRequestSchema,
    });

    if (response) return response;

    try {
      const bllResponse = await this.service.checkEmailAvailable(dto!.email!);

      return this.getNextResponse(
        { available: bllResponse } as CheckEmailAvailableResponse,
        200
      );
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async admins(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: adminUsersRequestSchema,
      acceptedRoles: [UserRoles.ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.admin(dto!);

      return this.getNextResponse(res as AdminUsersResponse, 200);
    } catch (error) {
      return this.getNextResponse(
        { message: "backend-errors.server", error },
        500
      );
    }
  }

  async inviteAdmin(req: NextRequest) {
    const data = await req.json();

    const { response, dto } = await this.handlerHelper({
      data,
      schema: inviteAdminRequestSchema,
      acceptedRoles: [UserRoles.ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.createUser({
        ...dto!,
        role: UserRoles.SUB_ADMIN,
      });

      return this.getNextResponse({ admin: res } as InviteAdminResponse, 201);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async companies(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: companiesUsersRequestSchema,
      acceptedRoles: [UserRoles.ADMIN, UserRoles.SUB_ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.companies(dto!);

      return this.getNextResponse(res as CompaniesUsersResponse, 200);
    } catch (error) {
      return this.getNextResponse(
        { message: "backend-errors.server", error },
        500
      );
    }
  }

  async customers(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: customerUsersRequestSchema,
      acceptedRoles: [UserRoles.ADMIN, UserRoles.SUB_ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.customers(dto!);

      return this.getNextResponse(res as CustomerUsersResponse, 200);
    } catch (error) {
      return this.getNextResponse(
        { message: "backend-errors.server", error },
        500
      );
    }
  }

  async company(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto, session } = await this.handlerHelper({
      data: params,
      schema: companiesUsersRequestSchema,
      acceptedRoles: [UserRoles.OWNER, UserRoles.MODERATOR],
    });

    if (!session?.user.companyId)
      return this.getNextResponse({ message: "backend-errors.server" }, 404);

    if (response) return response;

    try {
      const res = await this.service.company(dto!, session.user.companyId);

      return this.getNextResponse(res as CompaniesUsersResponse, 200);
    } catch (error) {
      return this.getNextResponse(
        { message: "backend-errors.server", error },
        500
      );
    }
  }
}
