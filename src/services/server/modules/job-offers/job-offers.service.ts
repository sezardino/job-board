import { AbstractService } from "@/services/server/helpers";

import { DEFAULT_PAGE_LIMIT } from "@/const";
import { Prisma } from "@prisma/client";
import { MyCompanyOffersRequest } from "./scema";

type FindManyJobOffersArgs = {
  where: Prisma.JobOfferWhereInput;
  select: Prisma.JobOfferSelect;
  page: number;
  limit: number;
};

export class JobOffersService extends AbstractService {
  async findMany(args: FindManyJobOffersArgs) {
    const { limit, page, select, where } = args;

    const offersCount = await this.prismaService.jobOffer.count({ where });

    const { skip, take, meta } = this.getPagination({
      count: offersCount,
      limit,
      page,
    });

    const offers = await this.prismaService.jobOffer.findMany({
      where,
      skip: skip,
      take: take,
      orderBy: { createdAt: "desc" },
      select,
    });

    return { offers, meta };
  }

  async companyOffers(data: MyCompanyOffersRequest, companyId: string) {
    const { search, status, limit = DEFAULT_PAGE_LIMIT, page = 0 } = data;

    const where: Prisma.JobOfferWhereInput = { companyId };

    if (search) where.name = { contains: search, mode: "insensitive" };
    if (status) where.status = status;

    return this.findMany({
      limit,
      page,
      where,
      select: {
        id: true,
        name: true,
        level: true,
        salary: true,
        createdAt: true,
        skills: { select: { name: true } },
      },
    });
  }
}
