import { FindManyPrismaEntity } from "@/types";
import { Prisma } from "@prisma/client";
import {
  AbstractBllService,
  GetPaginationReturnType,
} from "../../module.abstract";
import { AdminCategoriesRequest, AdminCategoriesResponse } from "./schema";

export class CategoriesBllModule extends AbstractBllService {
  protected async findMany(
    props: FindManyPrismaEntity<
      Prisma.CategoryWhereInput,
      Prisma.CategorySelect
    >
  ) {
    const { limit, page, select, where } = props;
    let pagination: GetPaginationReturnType | null = null;

    if (typeof page === "number" && typeof limit === "number") {
      const count = await this.prismaService.category.count({
        where,
      });

      pagination = this.getPagination({ count, limit, page });
    }

    const data = await this.prismaService.category.findMany({
      where,
      skip: pagination?.skip ? pagination.skip : undefined,
      take: pagination?.take ? pagination.take : undefined,
      orderBy: { createdAt: "desc" },
      select,
    });

    return { data, meta: pagination?.meta };
  }

  async admin(dto: AdminCategoriesRequest): Promise<AdminCategoriesResponse> {
    const { limit = 10, page = 0, search } = dto;

    const where: Prisma.CategoryWhereInput = {};

    if (search) where.name = { contains: search, mode: "insensitive" };

    const count = await this.prismaService.category.count({ where });

    const { meta, skip, take } = this.getPagination({ page, limit, count });

    const categories = await this.prismaService.category.findMany({
      select: {
        id: true,
        name: true,
        status: true,
        _count: { select: { offers: true } },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      where,
    });

    return { data: categories, meta };
  }

  activeList(industry: string) {
    return this.findMany({
      where: { status: "ACTIVE", industry: { name: industry } },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
