import { AbstractService } from "@/services/server/helpers";
import { Prisma } from "@prisma/client";
import { AdminIndustriesListRequest } from "../industries/schema";

export class CompaniesService extends AbstractService {
  async adminList(dto: AdminIndustriesListRequest) {
    const { limit = 10, page = 0, search } = dto;

    const where: Prisma.CompanyWhereInput = {};

    if (search) where.name = { contains: search, mode: "insensitive" };

    const count = await this.prismaService.company.count({ where });
    const { meta, skip, take } = this.getPagination({ page, limit, count });

    const companies = await this.prismaService.company.findMany({
      skip,
      take,
      where,
      orderBy: {
        name: "asc",
      },
    });

    return { companies, meta };
  }
}
