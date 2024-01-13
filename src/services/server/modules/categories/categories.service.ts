import { AbstractService } from "@/services/server/helpers";
import { FindManyPrismaEntity } from "@/types";
import { Prisma } from "@prisma/client";

export class CategoriesService extends AbstractService {
  protected async findMany(
    props: FindManyPrismaEntity<
      Prisma.CategoryWhereInput,
      Prisma.CategorySelect
    >
  ) {
    const { limit, page, select, where } = props;
    let pagination: ReturnType<AbstractService["getPagination"]> | null = null;

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
