import { DEFAULT_PAGE_LIMIT } from "@/const";
import { PrismaService } from "@/libs/prisma";
import { StatisticPeriod } from "@/types";
import dayjs from "dayjs";

type GetPaginationArgs = {
  page?: number;
  limit?: number;
  count: number;
};

type GetPercentageChange = {
  current: number;
  prev: number;
  endDate: string;
  startDate: string;
  period: StatisticPeriod;
};

export abstract class AbstractBllService {
  constructor(protected readonly prismaService: PrismaService) {}

  protected getPagination(args: GetPaginationArgs) {
    const { page = 0, limit = DEFAULT_PAGE_LIMIT, count = 0 } = args;

    const transformedPage = Number(page);
    const transformedLimit = Number(limit);

    const totalPages = Math.ceil(count / limit) - 1;

    return {
      skip: transformedPage * transformedLimit,
      take: Number(transformedLimit),
      meta: {
        totalPages: totalPages < 0 ? 0 : totalPages,
        page: transformedPage + 1,
        limit: transformedLimit,
        count,
      },
    };
  }

  protected getStatisticsWhere(period: StatisticPeriod) {
    const transformedPeriod = Number(period);

    if (transformedPeriod <= 0) {
      throw new Error("Invalid period");
    }

    const today = dayjs();
    const endDate = today.toISOString();
    const startDate = today.subtract(transformedPeriod, "days").toISOString();

    return {
      endDate,
      startDate,
      currentPeriodWhere: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      prevPeriodWhere: {
        createdAt: {
          gte: today.subtract(transformedPeriod * 2, "days").toISOString(),
          lt: today.subtract(transformedPeriod, "days").toISOString(),
        },
      },
    };
  }

  protected calculateStatistics(args: GetPercentageChange) {
    const { current, prev, endDate, startDate, period } = args;

    const transformedPeriod = Number(period);

    if (transformedPeriod <= 0) {
      throw new Error("Invalid period");
    }

    // Handle cases where current range is less than desired range (e.g., less than 7 days)
    const effectiveRange =
      dayjs(endDate).diff(dayjs(startDate), "days", true) + 1;
    const startCount = effectiveRange < transformedPeriod ? prev : current; // Use previous count if data is insufficient

    // Calculate percentage change (consider zero division)
    const percentageChange =
      startCount === 0
        ? 0
        : Math.round(((current - startCount) / startCount) * 100);

    const increased = percentageChange > 0;
    const decreased = percentageChange < 0;

    return {
      currentPeriod: current,
      prevPeriod: prev,
      type: increased ? "increase" : decreased ? "decrease" : "no-change",
      statistics: percentageChange,
    };
  }
}

export type GetPaginationReturnType = ReturnType<
  AbstractBllService["getPagination"]
>;
