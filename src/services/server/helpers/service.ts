import { PrismaService } from "@/libs/prisma";

type GetPaginationArgs = {
  page?: number;
  limit?: number;
  count: number;
};

export abstract class AbstractService {
  constructor(protected readonly prismaService: PrismaService) {}

  getPagination(args: GetPaginationArgs) {
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
