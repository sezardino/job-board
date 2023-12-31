import { AbstractService } from "@/services/server/helpers";

import { DEFAULT_PAGE_LIMIT } from "@/const";
import { JobOfferStatus, Prisma } from "@prisma/client";
import { CompanyOffersRequest, OffersListRequest } from "./scema";

type FindManyJobOffersArgs = {
  where: Prisma.JobOfferWhereInput;
  select: Prisma.JobOfferSelect;
  page: number;
  limit: number;
};

export class JobOffersService extends AbstractService {
  // async findMany(args: FindManyJobOffersArgs) {
  //   const { limit, page, select, where } = args;

  //   const offersCount = await this.prismaService.jobOffer.count({ where });

  //   const { skip, take, meta } = this.getPagination({
  //     count: offersCount,
  //     limit,
  //     page,
  //   });

  //   const offers = await this.prismaService.jobOffer.findMany({
  //     where,
  //     skip: skip,
  //     take: take,
  //     orderBy: { createdAt: "desc" },
  //     select,
  //   });

  //   return { offers, meta };
  // }

  async companyOffers(data: CompanyOffersRequest, companyId: string) {
    const { search, status, limit = DEFAULT_PAGE_LIMIT, page = 0 } = data;

    const where: Prisma.JobOfferWhereInput = { companyId };

    if (search) where.name = { contains: search, mode: "insensitive" };
    if (status) where.status = status;

    return this.findMany(
      {
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
      },
      "jobOffer"
    );
  }

  async list(data: OffersListRequest) {
    const {
      search,
      industry,
      category,
      limit = DEFAULT_PAGE_LIMIT,
      page = 0,
    } = data;

    const where: Prisma.JobOfferWhereInput = {
      status: JobOfferStatus.ACTIVE,
      industry: { name: industry },
    };

    if (search) where.name = { contains: search, mode: "insensitive" };
    if (category) where.category = { name: category };

    return this.findMany(
      {
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
          company: {
            select: {
              id: true,
              name: true,
              logo: { select: { id: true, url: true, name: true } },
            },
          },
        },
      },
      "jobOffer"
    );
  }
}
