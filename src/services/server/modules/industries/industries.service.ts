import { AbstractService } from "@/services/server/helpers";
import { Prisma } from "@prisma/client";
import {
  CreateIndustryRequest,
  DeleteIndustryRequest,
  UpdateIndustryRequest,
  UpdateIndustryResponse,
} from "./schema";
import {
  AdminIndustriesListRequest,
  AdminIndustriesListResponse,
} from "./schema/admin-list";

export class IndustriesService extends AbstractService {
  async create(dto: CreateIndustryRequest): Promise<CreateIndustryRequest> {
    return await this.prismaService.industry.create({
      data: dto,
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  }

  async update(
    dto: UpdateIndustryRequest & { id: string }
  ): Promise<UpdateIndustryResponse> {
    const { id, status } = dto;

    return await this.prismaService.industry.update({
      data: { status },
      select: {
        id: true,
        name: true,
        status: true,
      },
      where: { id },
    });
  }

  async delete(id: string): Promise<DeleteIndustryRequest | null> {
    const industry = await this.prismaService.industry.findUnique({
      where: { id },
      select: {
        _count: {
          select: {
            categories: true,
            offers: true,
          },
        },
      },
    });

    if (industry?._count.categories || industry?._count.offers) return null;

    return await this.prismaService.industry.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  }

  async adminList(
    dto: AdminIndustriesListRequest
  ): Promise<AdminIndustriesListResponse> {
    const { limit = 10, page = 0, search } = dto;

    const where: Prisma.IndustryWhereInput = {};

    if (search) where.name = { contains: search, mode: "insensitive" };

    const count = await this.prismaService.industry.count({ where });

    const { meta, skip, take } = this.getPagination({ page, limit, count });

    const industries = await this.prismaService.industry.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        _count: {
          select: {
            categories: true,
            offers: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
      skip,
      take,
      where,
    });

    return { industries, meta };
  }
}
