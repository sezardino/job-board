import { AbstractController } from "@/services/server/helpers";
import { UserRoles } from "@prisma/client";
import { NextRequest } from "next/server";
import { JobOffersService } from "./job-offers.service";
import {
  OneOfferResponse,
  companyOffersRequestSchema,
  offersListRequestSchema,
} from "./scema";

export class JobOffersController extends AbstractController<JobOffersService> {
  async myCompanyOffers(req: NextRequest) {
    const data = this.formatParams(req.nextUrl.searchParams);

    const { dto, response, session } = await this.handlerHelper({
      data,
      acceptedRoles: [
        UserRoles.OWNER,
        UserRoles.MODERATOR,
        UserRoles.RECRUITER,
      ],
      schema: companyOffersRequestSchema,
    });

    if (response) return response;

    if (!session)
      return this.getNextResponse(
        { message: "backend-errors.unauthorized" },
        401
      );

    try {
      const res = await this.service.companyOffers(
        dto!,
        session.user.companyId!
      );

      return this.getNextResponse(res, 200);
    } catch (error) {
      console.log(error);
      return this.getNextResponse({ error }, 500);
    }
  }

  async list(req: NextRequest) {
    const data = this.formatParams(req.nextUrl.searchParams);

    const { dto, response } = await this.handlerHelper({
      data,
      schema: offersListRequestSchema,
    });

    if (response) return response;

    try {
      const res = await this.service.list(dto!);

      return this.getNextResponse(res, 200);
    } catch (error) {
      console.log(error);
      return this.getNextResponse({ error }, 500);
    }
  }

  async one(id: string) {
    try {
      const res = await this.service.one(id);

      return this.getNextResponse(res as OneOfferResponse, 200);
    } catch (error) {
      console.log(error);
      return this.getNextResponse({ error }, 500);
    }
  }
}
