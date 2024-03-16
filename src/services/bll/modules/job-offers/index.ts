import { AbstractService } from "@/services/server/helpers";

import { DEFAULT_PAGE_LIMIT } from "@/const";
import { FindManyPrismaEntity } from "@/types";
import { JobOfferStatus, Prisma } from "@prisma/client";
import {
  CreateJobOfferRequest,
  CurrentCompanyJobOffersRequest,
  OffersListRequest,
} from "./schema";

export class JobOffersBllModule extends AbstractService {
  protected async findMany(
    props: FindManyPrismaEntity<
      Prisma.JobOfferWhereInput,
      Prisma.JobOfferSelect
    >
  ) {
    const { limit, page, select, where } = props;
    let pagination: ReturnType<AbstractService["getPagination"]> | null = null;

    if (typeof page === "number" && typeof limit === "number") {
      const count = await this.prismaService.jobOffer.count({
        where,
      });

      pagination = this.getPagination({ count, limit, page });
    }

    const data = await this.prismaService.jobOffer.findMany({
      where,
      skip: pagination?.skip ? pagination.skip : undefined,
      take: pagination?.take ? pagination.take : undefined,
      orderBy: { createdAt: "desc" },
      select,
    });

    return { data, meta: pagination?.meta };
  }

  async companyOffers(data: CurrentCompanyJobOffersRequest, companyId: string) {
    const {
      search,
      status,
      seniority,
      limit = DEFAULT_PAGE_LIMIT,
      page = 0,
    } = data;

    const where: Prisma.JobOfferWhereInput = { companyId };

    if (search) where.name = { contains: search, mode: "insensitive" };
    if (status) where.status = status;
    if (seniority) where.seniority = seniority;

    return this.findMany({
      limit,
      page,
      where,
      select: {
        id: true,
        name: true,
        seniority: true,
        status: true,
        deadlineAt: true,
        category: { select: { name: true, id: true } },
        industry: { select: { name: true, id: true } },
      },
    });
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

    return this.findMany({
      limit,
      page,
      where,
      select: {
        id: true,
        name: true,
        seniority: true,
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
    });
  }

  one(id: string, userCompanyId?: string) {
    return this.prismaService.jobOffer.findUnique({
      where: { id, status: JobOfferStatus.ACTIVE },
      select: {
        id: true,
        name: true,
        seniority: true,
        contract: true,
        deadlineAt: true,
        publishedAt: true,
        description: true,
        operating: true,
        salary: true,
        skills: true,
        status: true,
        type: true,
        category: { select: { name: true } },
        industry: { select: { name: true } },
        company: {
          select: {
            id: true,
            name: true,
            slogan: true,
            logo: { select: { id: true, url: true, name: true } },
          },
        },
      },
    });
  }

  create(dto: CreateJobOfferRequest, companyId: string) {
    const { category, industry, ...rest } = dto;

    return this.prismaService.jobOffer.create({
      data: {
        industry: { connect: { name: dto.industry } },
        company: { connect: { id: companyId } },
        category: { connect: { name: dto.category } },
        // TODO: add location
        ...rest,
      },
      select: { id: true },
    });
  }
}
