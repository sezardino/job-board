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
  EditOfferRequest,
  OffersForManageRequest,
  OffersListRequest,
  PreviewOfferRequest,
} from "./schema";

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

  async validateExist(offerId: string, companyId: string) {
    const offer = await this.prismaService.offer.findUnique({
      where: { id: offerId, companyId },
      select: { id: true, status: true },
    });

    if (!offer) throw new NotFoundException("Offer not found");

    return offer;
  }

  async offersForManage(data: OffersForManageRequest & { isAdmin: boolean }) {
    const {
      search,
      status,
      seniority,
      limit = DEFAULT_PAGE_LIMIT,
      page = 0,
      companyId,
      industryId,
      categoryId,
      isAdmin,
    } = data;

    const where: Prisma.OfferWhereInput = { companyId };

    if (search) where.name = { contains: search, mode: "insensitive" };

    where.status = status
      ? status
      : isAdmin
      ? undefined
      : {
          in: [
            OfferStatus.ACTIVE,
            OfferStatus.DRAFT,
            OfferStatus.FINISHED,
            OfferStatus.ARCHIVED,
          ],
        };
    if (seniority) where.seniority = seniority;
    if (industryId) where.industryId = industryId;
    if (categoryId) where.categoryId = categoryId;

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

  async list(data: OffersListRequest, notThisOfferId?: string) {
    const {
      contract,
      operating,
      salary,
      seniority,
      categoryId,
      industryId,
      type,
      search,
      industry,
      category,
      companyId,
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
    if (notThisOfferId) where.id = { not: notThisOfferId };
    if (industry) where.industry = { name: industry };
    if (category) where.category = { name: category };
    if (seniority) where.seniority = { in: seniority };
    if (type) where.type = { in: type };
    if (contract) where.contract = { hasSome: contract };
    if (operating) where.operating = { hasSome: operating };
    if (categoryId) where.categoryId = categoryId;
    if (industryId) where.industryId = industryId;
    if (companyId) where.companyId = companyId;
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
    dto: PreviewOfferRequest & {
      id: string;
      companyId?: string;
      customerId?: string;
    }
  ) {
    const { id, companyId, isPreview, customerId } = dto;

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
        _count: customerId
          ? {
              select: {
                applications: {
                  where: { userId: customerId },
                },
              },
            }
          : undefined,
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

    const { _count, ...restOffer } = offer;

    return {
      ...restOffer,
      ...(customerId
        ? { isAlreadyApplied: _count ? !!_count.applications : undefined }
        : {}),
    };
  }

  async basicData(dto: { offerId: string; companyId: string }) {
    const { offerId, companyId } = dto;

    const neededOffer = await this.prismaService.offer.findUnique({
      where: { id: offerId, companyId },
      select: {
        id: true,
        name: true,
        seniority: true,
        salaryFrom: true,
        salaryTo: true,
        contract: true,
        operating: true,
        skills: true,
        status: true,
        type: true,
        category: { select: { name: true, id: true } },
        industry: { select: { name: true, id: true } },
        _count: { select: { applications: true } },
      },
    });

    if (!neededOffer) throw new NotFoundException("Offer not found");

    return neededOffer;
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

    const offer = await this.validateExist(offerId, companyId);

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
    dto: ChangeOfferStatusRequest & { offerId: string; companyId: string }
  ) {
    const { offerId, companyId, status } = dto;
    const neededOffer = await this.validateExist(offerId, companyId);

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
    const neededOffer = await this.validateExist(offerId, companyId);

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
    const { page, limit, search } = dto;

    const example = await this.prismaService.offer.findUnique({
      where: { id: offerId },
      select: {
        industryId: true,
        categoryId: true,
        skills: true,
        seniority: true,
      },
    });

    if (!example) throw new NotFoundException("Offer not found");

    const { industryId, categoryId, skills, seniority } = example;

    return this.list(
      {
        page,
        limit,
        search,
        industryId,
        categoryId,
        seniority: [seniority],
        skills,
      },
      offerId
    );
  }
}
