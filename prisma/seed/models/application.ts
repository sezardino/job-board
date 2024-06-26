import { faker } from "@faker-js/faker";
import { ApplicationStatus, Prisma } from "@prisma/client";
import { rangeArray } from "./helpers";

type Args = {
  count?: number;
  offerId: string;
  cvId: string;
  usersIds: string[];
};

export const generateJobApplication = ({
  offerId,
  usersIds,
  cvId,
}: Args): Prisma.ApplicationCreateManyInput => {
  const status = faker.helpers.arrayElement(Object.values(ApplicationStatus));
  const random = faker.datatype.boolean();

  return {
    dataProcessing: true,
    futureRecruitment: faker.datatype.boolean(),
    email: faker.internet.email(),
    message: faker.lorem.paragraph(),
    name: faker.person.fullName(),
    status,
    offerId,
    curriculumVitaeId: cvId,
    userId: random ? faker.helpers.arrayElement(usersIds) : undefined,
  };
};

export const generateMockApplications = (args: Args) => {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateJobApplication(rest));
};
