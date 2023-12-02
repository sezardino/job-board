import { AbstractController } from "@/services/server/helpers";
import { UserRoles } from "@prisma/client";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { IndustriesService } from "./industries.service";
import {
  createIndustryRequestSchema,
  updateIndustryRequestSchema,
} from "./schema";
import { adminIndustriesListRequestSchema } from "./schema/admin-list";

export class IndustriesController extends AbstractController<IndustriesService> {
  async adminList(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: adminIndustriesListRequestSchema,
      acceptedRoles: [UserRoles.ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.adminList(dto!);

      return this.getNextResponse(res, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async create(req: NextRequest) {
    const data = await req.json();

    const { response, dto } = await this.handlerHelper({
      data,
      schema: createIndustryRequestSchema,
      acceptedRoles: [UserRoles.ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.create(dto!);

      return this.getNextResponse({ industry: res }, 201);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async update(req: NextApiRequest) {
    const data = req.body;
    const { id } = req.query;

    const { response, dto } = await this.handlerHelper({
      data,
      schema: updateIndustryRequestSchema,
      acceptedRoles: [UserRoles.ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.update({
        status: dto!.status,
        id: id as string,
      });

      return this.getNextResponse(res, 201);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async delete(req: NextApiRequest) {
    const { id } = req.query;

    const { response } = await this.handlerHelper({
      acceptedRoles: [UserRoles.ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.delete(id as string);

      if (!res)
        return this.getNextResponse(
          { message: "backend-errors.not-found" },
          404
        );

      return this.getNextResponse(res, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
