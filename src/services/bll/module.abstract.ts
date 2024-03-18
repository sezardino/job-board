import { DEFAULT_PAGE_LIMIT } from "@/const";
import { PrismaService } from "@/libs/prisma";

type GetPaginationArgs = {
  page?: number;
  limit?: number;
  count: number;
};

export abstract class AbstractBllService {
  constructor(protected readonly prismaService: PrismaService) {}

  protected getPagination(args: GetPaginationArgs) {
    const { page = 0, limit = DEFAULT_PAGE_LIMIT, count = 0 } = args;

    return {
      skip: page * limit,
      take: Number(limit),
      meta: {
        totalPages: Math.ceil(count / limit) - 1,
        page,
        limit,
        count,
      },
    };
  }
}

export type GetPaginationReturnType = ReturnType<
  AbstractBllService["getPagination"]
>;
