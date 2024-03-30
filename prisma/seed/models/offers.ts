import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import {
  jobContracts,
  jobDescriptionHTML,
  jobOfferStatuses,
  jobOperatingModes,
  jobSkills,
  jobTypes,
  seniorities,
  skillLevels,
} from "./const";
import { rangeArray } from "./helpers";

type Args = {
  count?: number;
  companyId: string;
  industries: { id: string; categories: { id: string }[] }[];
};

const generateMockOffer = (args: Args): Prisma.JobOfferCreateManyInput => {
  const { companyId, industries } = args;

  const industryId = faker.helpers.arrayElement(industries).id;
  const categoryId = faker.helpers.arrayElement(
    industries.find((i) => i.id === industryId)!.categories
  ).id;

  const from = faker.number.float({ min: 1000, max: 10000 });

  const to = faker.number.float({ min: from, max: 100000 });

  const skills = faker.helpers
    .shuffle(jobSkills)
    .slice(1, faker.number.int({ min: 1, max: 10 }))
    .map((name) => ({
      name,
      level: faker.helpers.arrayElement(skillLevels),
    }));

  return {
    name: faker.company.catchPhraseNoun(),
    industryId,
    categoryId,
    companyId,
    skills,
    contract: faker.helpers.arrayElements(jobContracts),
    operating: faker.helpers.arrayElements(jobOperatingModes),
    description: jobDescriptionHTML,
    seniority: faker.helpers.arrayElement(seniorities),
    status: faker.helpers.arrayElement(jobOfferStatuses),
    type: faker.helpers.arrayElement(jobTypes),
    salary: { from, to },
    publishedAt: faker.date.past(),
    // deadlineAt: faker.date.future(),
  };
};

export const generateMockOffers = (args: Args) => {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateMockOffer(rest));
};
