import { AbstractService } from "@/services/server/helpers";

import { faker } from "@faker-js/faker";
import { Seniority } from "@prisma/client";
export class JobOffersService extends AbstractService {
  create({
    industryId,
    categoryId,
    companyId,
  }: {
    industryId: string;
    categoryId: string;
    companyId: string;
  }) {
    const from = faker.number.float({ min: 1000, max: 10000 });

    const to = faker.number.float({ min: from, max: 100000 });

    this.prismaService.industry.findMany({
      select: { id: true, categories: { select: { id: true } } },
    });

    this.prismaService.jobOffer.create({
      data: {
        name: faker.company.catchPhraseNoun(),
        industryId,
        categoryId,
        companyId,
        level: faker.helpers.arrayElement([
          Seniority.TRAINEE,
          Seniority.JUNIOR,
          Seniority.MIDDLE,
          Seniority.SENIOR,
          Seniority.LEAD,
          Seniority.ARCHITECT,
        ]),
        salary: {
          from,
          to,
          currency: faker.finance.currencyCode(),
        },
      },
    });
  }
}
