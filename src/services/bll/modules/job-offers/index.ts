import { DEFAULT_PAGE_LIMIT } from "@/const";
import {
  FindManyPrismaEntity,
  NotAllowedException,
  NotFoundException,
} from "@/types";
import { JobOfferStatus, Prisma } from "@prisma/client";
import { AbstractBllService } from "../../module.abstract";
import {
  ChangeJobOfferStatusRequest,
  CommonJobOffersRequest,
  CreateJobOfferRequest,
  CurrentCompanyJobOffersRequest,
  OffersListRequest,
  PreviewJobOfferRequest,
} from "./schema";
import { EditJobOfferRequest } from "./schema/edit";

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
        // TODO: add in next version
        // deadlineAt: true,
        category: { select: { name: true, id: true } },
        industry: { select: { name: true, id: true } },
      },
    });
  }

  async list(data: OffersListRequest) {
    const {
      contract,
      operating,
      salary,
      seniority,
      type,
      search,
      industry,
      category,
      limit = DEFAULT_PAGE_LIMIT,
      page = 0,
    } = data;

    const where: Prisma.JobOfferWhereInput = {
      status: JobOfferStatus.ACTIVE,
    };

    if (search) where.name = { contains: search, mode: "insensitive" };
    if (search)
      where.OR = [
        ...(where.OR || []),
        {
          skills: { some: { name: { contains: search, mode: "insensitive" } } },
        },
      ];
    if (industry) where.industry = { name: industry };
    if (category) where.category = { name: category };
    if (seniority) where.seniority = { in: seniority };
    if (type) where.type = { in: type };
    if (contract) where.contract = { hasSome: contract };
    if (operating) where.operating = { hasSome: operating };
    if (salary) {
      where.salaryFrom = { gt: salary.from, lt: salary.to };
      where.salaryTo = { gt: salary.from, lt: salary.to };
    }

    return this.findMany({
      limit,
      page,
      where,
      select: {
        id: true,
        name: true,
        seniority: true,
        salaryFrom: true,
        salaryTo: true,
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
        // TODO: add in next version
        // deadlineAt: true,
        publishedAt: true,
        description: true,
        operating: true,
        salaryFrom: true,
        salaryTo: true,
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

  async create(dto: CreateJobOfferRequest, companyId: string) {
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

  async editionData(offerId: string, companyId: string) {
    const neededOffer = await this.prismaService.jobOffer.findUnique({
      where: { id: offerId, companyId },
      select: {
        id: true,
        name: true,
        description: true,
        skills: { select: { name: true, level: true } },
      },
    });

    if (!neededOffer) throw new NotFoundException("Job offer not found");

    return neededOffer;
  }

  async edit(dto: EditJobOfferRequest, offerId: string, companyId: string) {
    const { description, skills } = dto;

    const jobOffer = await this.prismaService.jobOffer.findUnique({
      where: { id: offerId, companyId },
      select: { id: true, status: true },
    });

    if (!jobOffer) throw new NotFoundException("Job offer not found");
    if (
      jobOffer.status === JobOfferStatus.FINISHED ||
      jobOffer.status === JobOfferStatus.ARCHIVED ||
      jobOffer.status === JobOfferStatus.INACTIVE
    )
      throw new NotAllowedException("Job offer is not editable");

    return this.prismaService.jobOffer.update({
      where: { id: offerId, companyId },
      data: { description, skills },
      select: { id: true },
    });
  }

  async changeStatus(
    dto: ChangeJobOfferStatusRequest,
    offerId: string,
    companyId: string
  ) {
    const { status } = dto;
    const neededJobOffer = await this.prismaService.jobOffer.findUnique({
      where: { id: offerId, companyId },
      select: { id: true, status: true },
    });

    if (!neededJobOffer) throw new NotFoundException("Job offer not found");

    switch (status) {
      case JobOfferStatus.ACTIVE:
        if (neededJobOffer.status !== JobOfferStatus.DRAFT)
          throw new NotAllowedException("Only draft offers can be published");
        break;
      case JobOfferStatus.ARCHIVED:
        if (neededJobOffer.status !== JobOfferStatus.FINISHED)
          throw new NotAllowedException("Only finished offers can be archived");
        break;
      case JobOfferStatus.FINISHED:
        if (neededJobOffer.status !== JobOfferStatus.ACTIVE)
          throw new NotAllowedException("Only active offers can be finished");
        break;
      default:
        throw new NotAllowedException("Invalid status");
    }

    return this.prismaService.jobOffer.update({
      where: { id: offerId, companyId },
      data: { status },
    });
  }

  async delete(offerId: string, companyId: string) {
    const neededJobOffer = await this.prismaService.jobOffer.findUnique({
      where: { id: offerId, companyId },
      select: { id: true, status: true },
    });

    if (!neededJobOffer) throw new NotFoundException("Job offer not found");

    if (neededJobOffer.status === JobOfferStatus.DRAFT) {
      return this.prismaService.jobOffer.delete({
        where: { id: offerId, companyId },
      });
    }

    return this.prismaService.jobOffer.update({
      where: { id: offerId, companyId },
      data: { status: JobOfferStatus.INACTIVE },
    });
  }

  async commonJobOffers(dto: CommonJobOffersRequest, offerId: string) {
    const { page } = dto;

    const example = await this.prismaService.jobOffer.findUnique({
      where: { id: offerId },
    });

    if (!example) throw new NotFoundException("Job offer not found");

    const { industryId, categoryId, skills, seniority } = example;

    return this.findMany({
      limit: 5,
      page,
      where: {
        status: JobOfferStatus.ACTIVE,
        industryId: { equals: industryId },
        categoryId: { equals: categoryId },
        skills: { some: { name: { in: skills.map((skill) => skill.name) } } },
        seniority: { equals: seniority },
      },
      select: {
        id: true,
        name: true,
        seniority: true,
        salaryFrom: true,
        salaryTo: true,
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
}
