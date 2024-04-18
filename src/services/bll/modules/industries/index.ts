import { NotAllowedException, NotFoundException } from "@/types";
import { EntityStatus, Prisma } from "@prisma/client";
import { AbstractBllService } from "../../module.abstract";
import {
  AdminIndustriesRequest,
  AdminIndustriesResponse,
  CreateIndustryRequest,
  UpdateIndustryRequest,
} from "./schema";

export class IndustriesBllModule extends AbstractBllService {
  async checkNameAvailable(name: string): Promise<boolean> {
    const user = await this.prismaService.industry.findUnique({
      where: { name },
      select: { id: true },
    });

    return !Boolean(user);
  }

  async create(dto: CreateIndustryRequest) {
    return await this.prismaService.industry.create({
      data: dto,
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  }

  async baseData(id: string) {
    return await this.prismaService.industry.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  }

  async update(dto: UpdateIndustryRequest & { id: string }) {
    const { id, status } = dto;

    if (status === EntityStatus.CREATED)
      throw new NotAllowedException("Invalid status");

    return await this.prismaService.industry.update({
      data: { status },
      select: {
        id: true,
        name: true,
        status: true,
      },
      where: { id },
    });
  }

  async delete(id: string) {
    const industry = await this.prismaService.industry.findUnique({
      where: { id },
      select: {
        _count: {
          select: {
            categories: true,
            offers: true,
          },
        },
      },
    });

    if (industry?._count.categories || industry?._count.offers)
      throw new NotFoundException("Category not found");

    return await this.prismaService.industry.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });
  }

  async admin(dto: AdminIndustriesRequest): Promise<AdminIndustriesResponse> {
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
        createdAt: "desc",
      },
      skip,
      take,
      where,
    });

    return { data: industries, meta };
  }

  async activeIndustries() {
    return await this.prismaService.industry.findMany({
      where: { status: EntityStatus.ACTIVE },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
