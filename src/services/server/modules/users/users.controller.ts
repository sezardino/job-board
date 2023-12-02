import { AbstractController } from "@/services/server/helpers";
import { UserRoles } from "@prisma/client";
import { NextRequest } from "next/server";
import { isEmailAvailableRequestSchema } from "./schema";
import { adminsListRequestSchema } from "./schema/admins-list";
import { inviteAdminRequestSchema } from "./schema/invite-admin";
import { UsersService } from "./users.service";

export class UsersController extends AbstractController<UsersService> {
  async isLoginAvailable(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: isEmailAvailableRequestSchema,
    });

    if (response) return response;

    try {
      const bllResponse = await this.service.isEmailAvailable(dto!.email!);

      return this.getNextResponse({ available: bllResponse }, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async adminsList(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: adminsListRequestSchema,
    });

    if (response) return response;

    try {
      const res = await this.service.admins(dto!);

      return this.getNextResponse(res, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
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

      return this.getNextResponse(res, 201);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
