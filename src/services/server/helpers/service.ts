import { PrismaService } from "@/libs/prisma";
import { FindManyPrismaEntity } from "@/types";
import { PrismaClient } from "@prisma/client";
import {
  DefaultArgs,
  PrismaClientOptions,
} from "@prisma/client/runtime/library";

type GetPaginationArgs = {
  page?: number;
  limit?: number;
  count: number;
};

export abstract class AbstractService {
  constructor(protected readonly prismaService: PrismaService) {}

  protected async findMany<Where, Select>(
    args: FindManyPrismaEntity<Where, Select>,
    entity: keyof PrismaClient<PrismaClientOptions, never, DefaultArgs>
  ) {
    const { limit, page, select, where } = args;
    let pagination: ReturnType<AbstractService["getPagination"]> | null = null;

    if (page && limit) {
      // @ts-ignore
      const offersCount = await this.prismaService[entity].count({
        where,
      });

      pagination = this.getPagination({
        count: offersCount,
        limit,
        page,
      });
    }

    // @ts-ignore
    const data = await this.prismaService[entity].findMany({
      where,
      skip: pagination?.skip ? pagination.skip : undefined,
      take: pagination?.take ? pagination.take : undefined,
      orderBy: { createdAt: "desc" },
      select,
    });

    return { data, meta: pagination?.meta };
  }

  protected getPagination(args: GetPaginationArgs) {
    const { page = 0, limit = 10, count = 0 } = args;
    const totalPages = Math.ceil(count / limit);

    return {
      skip: page * limit,
      take: limit,
      meta: {
        totalPages,
        page: page + 1,
        limit,
        count,
      },
    };
  }
}
