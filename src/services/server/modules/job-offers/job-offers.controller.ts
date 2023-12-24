import { AbstractController } from "@/services/server/helpers";
import { UserRoles } from "@prisma/client";
import { NextRequest } from "next/server";
import { JobOffersService } from "./job-offers.service";
import { MyCompanyOffersResponse, myCompanyOffersRequestSchema } from "./scema";

export class JobOffersController extends AbstractController<JobOffersService> {
  async myCompanyOffers(req: NextRequest) {
    const data = this.formatParams(req.nextUrl.searchParams.entries());

    const { dto, response, session } = await this.handlerHelper({
      data,
      acceptedRoles: [
        UserRoles.OWNER,
        UserRoles.MODERATOR,
        UserRoles.RECRUITER,
      ],
      schema: myCompanyOffersRequestSchema,
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

      return this.getNextResponse(res as MyCompanyOffersResponse, 200);
    } catch (error) {
      console.log(error);
      return this.getNextResponse({ error }, 500);
    }
  }
}
