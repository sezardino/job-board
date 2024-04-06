import { faker } from "@faker-js/faker";
import { JobApplicationStatus, Prisma } from "@prisma/client";
import { rangeArray } from "./helpers";

type Args = {
  count?: number;
  offerId: string;
  cvId: string;
};

export const generateJobApplication = ({
  offerId,
  cvId,
}: Args): Prisma.JobApplicationCreateManyInput => {
  const status = faker.helpers.arrayElement(
    Object.values(JobApplicationStatus)
  );

  return {
    dataProcessing: true,
    futureRecruitment: faker.datatype.boolean(),
    email: faker.internet.email(),
    message: faker.lorem.paragraph(),
    name: faker.person.fullName(),
    status,
    jobOfferId: offerId,
    curriculumVitaeId: cvId,
  };
};

export const generateMockJobApplications = (args: Args) => {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateJobApplication(rest));
};
