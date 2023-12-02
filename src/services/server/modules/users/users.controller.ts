import { AbstractController } from "@/services/server/helpers";
import { NextRequest } from "next/server";
import { isEmailAvailableRequestSchema } from "./schema";
import { UsersService } from "./users.service";

export class UsersController extends AbstractController<UsersService> {
  async isLoginAvailable(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: isEmailAvailableRequestSchema,
      skipAuth: true,
    });

    if (response) return response;

    try {
      const bllResponse = await this.service.isEmailAvailable(dto!.email!);

      return this.getNextResponse({ available: bllResponse }, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
