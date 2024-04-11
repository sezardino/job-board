import { StatisticPeriod } from "@/types";
import { AbstractBllService } from "../../module.abstract";
import { AdminStatisticsRequest } from "./schema";

export class StatisticsBllModule extends AbstractBllService {
  async admin(dto: AdminStatisticsRequest) {
    const { period = StatisticPeriod.Week } = dto;
    const { endDate, startDate, currentPeriodWhere, prevPeriodWhere } =
      this.getStatisticsWhere(period);

    // users
    const usersCurrentPeriodCount = await this.prismaService.user.count({
      where: currentPeriodWhere,
    });

    const usersPrevPeriodCount = await this.prismaService.user.count({
      where: prevPeriodWhere,
    });

    // companies
    const companiesCurrentPeriodCount = await this.prismaService.company.count({
      where: currentPeriodWhere,
    });

    const companiesPrevPeriodCount = await this.prismaService.company.count({
      where: prevPeriodWhere,
    });

    // offers
    const offersCurrentPeriodCount = await this.prismaService.offer.count({
      where: currentPeriodWhere,
    });

    const offersPrevPeriodCount = await this.prismaService.offer.count({
      where: prevPeriodWhere,
    });

    // applications
    const applicationsCurrentPeriodCount =
      await this.prismaService.application.count({
        where: currentPeriodWhere,
      });

    const applicationsPrevPeriodCount =
      await this.prismaService.application.count({
        where: prevPeriodWhere,
      });

    return {
      users: this.calculateStatistics({
        current: usersCurrentPeriodCount,
        prev: usersPrevPeriodCount,
        endDate,
        startDate,
        period,
      }),
      companies: this.calculateStatistics({
        current: companiesCurrentPeriodCount,
        prev: companiesPrevPeriodCount,
        endDate,
        startDate,
        period,
      }),
      offers: this.calculateStatistics({
        current: offersCurrentPeriodCount,
        prev: offersPrevPeriodCount,
        endDate,
        startDate,
        period,
      }),
      applications: this.calculateStatistics({
        current: applicationsCurrentPeriodCount,
        prev: applicationsPrevPeriodCount,
        endDate,
        startDate,
        period,
      }),
    };
  }
}
