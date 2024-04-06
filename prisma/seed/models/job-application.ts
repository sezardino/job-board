import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { rangeArray } from "./helpers";

type Args = {
  count?: number;
  offerId: string;
  cvId: string;
};

export const generateJobApplication = ({
  offerId,
  cvId,
}: Args): Prisma.JobApplicationCreateManyInput => ({
  dataProcessing: true,
  futureRecruitment: faker.datatype.boolean(),
  email: faker.internet.email(),
  message: faker.lorem.paragraph(),
  name: faker.person.fullName(),
  jobOfferId: offerId,
  curriculumVitaeId: cvId,
});

export const generateMockJobApplications = (args: Args) => {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateJobApplication(rest));
};
