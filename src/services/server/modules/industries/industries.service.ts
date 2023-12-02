import { AbstractService } from "@/services/server/helpers";
import { Prisma } from "@prisma/client";
import {
  AdminIndustriesListRequest,
  AdminIndustriesListResponse,
} from "./schema/admin-list";

export class IndustriesService extends AbstractService {
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
