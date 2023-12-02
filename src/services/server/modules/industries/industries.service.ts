import { AbstractService } from "@/services/server/helpers";
import { Prisma } from "@prisma/client";
import { AdminIndustriesListRequest } from "./schema/admin-list";

export class IndustriesService extends AbstractService {
  async adminList(dto: AdminIndustriesListRequest) {
    const { limit = 10, page = 0, search } = dto;

    const where: Prisma.IndustryWhereInput = {};

    if (search) where.name = { contains: search, mode: "insensitive" };

    const count = await this.prismaService.industry.count({ where });

    const { meta, skip, take } = this.getPagination({ page, limit, count });

    const industries = await this.prismaService.industry.findMany({
      skip,
      take,
      where,
      orderBy: {
        name: "asc",
      },
    });

    return { industries, meta };
  }
}
