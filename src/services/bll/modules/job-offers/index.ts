import { DEFAULT_PAGE_LIMIT } from "@/const";
import { FindManyPrismaEntity, NotFoundException } from "@/types";
import { JobOfferStatus, Prisma } from "@prisma/client";
import { AbstractBllService } from "../../module.abstract";
import {
  CreateJobOfferRequest,
  CurrentCompanyJobOffersRequest,
  OffersListRequest,
  PreviewJobOfferRequest,
} from "./schema";

export class JobOffersBllModule extends AbstractBllService {
  protected async findMany(
    props: FindManyPrismaEntity<
      Prisma.JobOfferWhereInput,
      Prisma.JobOfferSelect
    >
  ) {
    const { limit, page, select, where } = props;

    const count = await this.prismaService.jobOffer.count({
      where,
    });

    const { meta, skip, take } = this.getPagination({ count, limit, page });

    const data = await this.prismaService.jobOffer.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select,
    });

    return { data, meta };
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

  async preview(
    dto: PreviewJobOfferRequest & { id: string; companyId?: string }
  ) {
    const { id, companyId, isPreview } = dto;

    const jobOffer = await this.prismaService.jobOffer.findUnique({
      where: {
        id,
        status: isPreview ? undefined : JobOfferStatus.ACTIVE,
        companyId: isPreview ? companyId : undefined,
      },
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

    if (!jobOffer) throw new NotFoundException("Job offer not found");

    return jobOffer;
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
