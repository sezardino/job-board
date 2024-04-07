import { DEFAULT_PAGE_LIMIT } from "@/const";
import {
  FindManyPrismaEntity,
  NotAllowedException,
  NotFoundException,
} from "@/types";
import { OfferStatus, Prisma } from "@prisma/client";
import { AbstractBllService } from "../../module.abstract";
import {
  ChangeOfferStatusRequest,
  CommonOffersRequest,
  CreateOfferRequest,
  CurrentCompanyOffersRequest,
  OffersListRequest,
  PreviewOfferRequest,
} from "./schema";
import { EditOfferRequest } from "./schema/edit";

export class OffersBllModule extends AbstractBllService {
  private async findMany(
    props: FindManyPrismaEntity<Prisma.OfferWhereInput, Prisma.OfferSelect>
  ) {
    const { limit, page, select, where } = props;

    const count = await this.prismaService.offer.count({
      where,
    });

    const { meta, skip, take } = this.getPagination({ count, limit, page });

    const data = await this.prismaService.offer.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: "desc" },
      select,
    });

    return { data, meta };
  }

  async companyOffers(data: CurrentCompanyOffersRequest, companyId: string) {
    const {
      search,
      status,
      seniority,
      limit = DEFAULT_PAGE_LIMIT,
      page = 0,
    } = data;

    const where: Prisma.OfferWhereInput = { companyId };

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
        _count: {
          select: {
            applications: true,
          },
        },
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

    const where: Prisma.OfferWhereInput = {
      status: OfferStatus.ACTIVE,
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

  async preview(dto: PreviewOfferRequest & { id: string; companyId?: string }) {
    const { id, companyId, isPreview } = dto;

    const offer = await this.prismaService.offer.findUnique({
      where: {
        id,
        status: isPreview ? undefined : OfferStatus.ACTIVE,
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

    if (!offer) throw new NotFoundException("Offer not found");

    return offer;
  }

  async create(dto: CreateOfferRequest, companyId: string) {
    const { category, industry, ...rest } = dto;

    return this.prismaService.offer.create({
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
    const neededOffer = await this.prismaService.offer.findUnique({
      where: { id: offerId, companyId },
      select: {
        id: true,
        name: true,
        description: true,
        skills: { select: { name: true, level: true } },
      },
    });

    if (!neededOffer) throw new NotFoundException("Offer not found");

    return neededOffer;
  }

  async edit(dto: EditOfferRequest, offerId: string, companyId: string) {
    const { description, skills } = dto;

    const offer = await this.prismaService.offer.findUnique({
      where: { id: offerId, companyId },
      select: { id: true, status: true },
    });

    if (!offer) throw new NotFoundException("Offer not found");
    if (
      offer.status === OfferStatus.FINISHED ||
      offer.status === OfferStatus.ARCHIVED ||
      offer.status === OfferStatus.INACTIVE
    )
      throw new NotAllowedException("Offer is not editable");

    return this.prismaService.offer.update({
      where: { id: offerId, companyId },
      data: { description, skills },
      select: { id: true },
    });
  }

  async changeStatus(
    dto: ChangeOfferStatusRequest,
    offerId: string,
    companyId: string
  ) {
    const { status } = dto;
    const neededOffer = await this.prismaService.offer.findUnique({
      where: { id: offerId, companyId },
      select: { id: true, status: true },
    });

    if (!neededOffer) throw new NotFoundException("Offer not found");

    switch (status) {
      case OfferStatus.ACTIVE:
        if (neededOffer.status !== OfferStatus.DRAFT)
          throw new NotAllowedException("Only draft offers can be published");
        break;
      case OfferStatus.ARCHIVED:
        if (neededOffer.status !== OfferStatus.FINISHED)
          throw new NotAllowedException("Only finished offers can be archived");
        break;
      case OfferStatus.FINISHED:
        if (neededOffer.status !== OfferStatus.ACTIVE)
          throw new NotAllowedException("Only active offers can be finished");
        break;
      default:
        throw new NotAllowedException("Invalid status");
    }

    return this.prismaService.offer.update({
      where: { id: offerId, companyId },
      data: { status },
    });
  }

  async delete(offerId: string, companyId: string) {
    const neededOffer = await this.prismaService.offer.findUnique({
      where: { id: offerId, companyId },
      select: { id: true, status: true },
    });

    if (!neededOffer) throw new NotFoundException("Offer not found");

    if (neededOffer.status === OfferStatus.DRAFT) {
      return this.prismaService.offer.delete({
        where: { id: offerId, companyId },
      });
    }

    return this.prismaService.offer.update({
      where: { id: offerId, companyId },
      data: { status: OfferStatus.INACTIVE },
    });
  }

  async commonOffers(dto: CommonOffersRequest, offerId: string) {
    const { page } = dto;

    const example = await this.prismaService.offer.findUnique({
      where: { id: offerId },
    });

    if (!example) throw new NotFoundException("Offer not found");

    const { industryId, categoryId, skills, seniority } = example;

    return this.findMany({
      limit: 5,
      page,
      where: {
        status: OfferStatus.ACTIVE,
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
