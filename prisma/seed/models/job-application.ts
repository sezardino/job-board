import { faker } from "@faker-js/faker";
import {
  JobAplicationRecruitmentStatus,
  JobAplicationStatus,
  Prisma,
} from "@prisma/client";
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
  const recruitmentStatus = faker.helpers.arrayElement(
    Object.values(JobAplicationRecruitmentStatus)
  );

  const status =
    recruitmentStatus === "REJECTED"
      ? JobAplicationStatus.REJECTED
      : JobAplicationStatus.PROCESSED;

  return {
    dataProcessing: true,
    futureRecruitment: faker.datatype.boolean(),
    email: faker.internet.email(),
    message: faker.lorem.paragraph(),
    name: faker.person.fullName(),
    status,
    recruitmentStatus,
    jobOfferId: offerId,
    curriculumVitaeId: cvId,
  };
};

export const generateMockJobApplications = (args: Args) => {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateJobApplication(rest));
};
