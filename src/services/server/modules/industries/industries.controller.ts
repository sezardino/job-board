import { AbstractController } from "@/services/server/helpers";
import { UserRoles } from "@prisma/client";
import { NextRequest } from "next/server";
import { IndustriesService } from "./industries.service";
import {
  ActiveIndustriesResponse,
  AdminIndustriesResponse,
  CheckIndustryNameAvailableResponse,
  CreateIndustryResponse,
  DeleteIndustryResponse,
  UpdateIndustryResponse,
  adminIndustriesRequestSchema,
  checkIndustryNameAvailableRequestSchema,
  createIndustryRequestSchema,
  deleteIndustryRequestSchema,
  updateIndustryRequestSchema,
} from "./schema";

export class IndustriesController extends AbstractController<IndustriesService> {
  async checkNameAvailable(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: checkIndustryNameAvailableRequestSchema,
    });

    if (response) return response;

    try {
      const bllResponse = await this.service.checkNameAvailable(dto!.name!);

      return this.getNextResponse(
        { available: bllResponse } as CheckIndustryNameAvailableResponse,
        200
      );
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async admin(req: NextRequest) {
    const params = this.formatParams(req.nextUrl.searchParams.entries());

    const { response, dto } = await this.handlerHelper({
      data: params,
      schema: adminIndustriesRequestSchema,
      acceptedRoles: [UserRoles.ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.admin(dto!);

      return this.getNextResponse(res as AdminIndustriesResponse, 200);
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

      return this.getNextResponse(
        { industry: res } as CreateIndustryResponse,
        201
      );
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async update(req: NextRequest) {
    const data = await req.json();

    const { response, dto } = await this.handlerHelper({
      data,
      schema: updateIndustryRequestSchema,
      acceptedRoles: [UserRoles.ADMIN],
    });

    if (response) return response;

    try {
      const res = await this.service.update(dto!);

      if (!res) {
        return this.getNextResponse(
          { message: "backend-errors.not-found" },
          405
        );
      }

      return this.getNextResponse(res as UpdateIndustryResponse, 200);
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async delete(req: NextRequest) {
    const data = await req.json();

    const { dto, response } = await this.handlerHelper({
      acceptedRoles: [UserRoles.ADMIN],
      data,
      schema: deleteIndustryRequestSchema,
    });

    if (response) return response;

    try {
      const res = await this.service.delete(dto?.id!);

      if (!res)
        return this.getNextResponse(
          { message: "backend-errors.not-found" },
          404
        );

      return this.getNextResponse(
        { industry: res } as DeleteIndustryResponse,
        200
      );
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }

  async activeIndustries() {
    try {
      const res = await this.service.activeIndustries();

      return this.getNextResponse(
        { industries: res } as ActiveIndustriesResponse,
        200
      );
    } catch (error) {
      return this.getNextResponse({ message: "backend-errors.server" }, 500);
    }
  }
}
