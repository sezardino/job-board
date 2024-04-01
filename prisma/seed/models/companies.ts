import { faker } from "@faker-js/faker";
import { Prisma, UserRoles } from "@prisma/client";
import { jobOfferStatuses, jobTypes, seniorities, statuses } from "./const";

const generateSlug = (name: string) => {
  const slug = name
    .toLowerCase()
    .replace(/[\s+&@#\/\\,;?!$%\^*:()'"\[\]]+/g, "-");

  const cleanedSlug = slug.replace(/-+/g, "-");

  return cleanedSlug;
};

export const generateMockCompany = () => {
  const name = faker.company.name();

  return {
    name,
    slug: generateSlug(name),
    status: faker.helpers.arrayElement(statuses),
  };
};

export const generateMainMockCompany = (
  categoryIds: string[],
  industryIds: string[]
): Prisma.CompanyCreateInput => {
  return {
    name: "Main mock company",
    slug: "main-mock-company",
    status: "ACTIVE",
    offers: {
      createMany: {
        data: new Array(faker.number.int({ min: 5, max: 20 }))
          .fill(null)
          .map(() => ({
            categoryId: faker.helpers.arrayElement(categoryIds),
            industryId: faker.helpers.arrayElement(industryIds),
            name: faker.company.buzzPhrase(),
            salary: {
              from: faker.number.float({ min: 1000, max: 10000 }),
              to: faker.number.float({ min: 10000, max: 100000 }),
            },
            type: faker.helpers.arrayElement(jobTypes),
            status: faker.helpers.arrayElement(jobOfferStatuses),
            seniority: faker.helpers.arrayElement(seniorities),
          })),
      },
    },
    members: {
      createMany: {
        data: [
          {
            email: "company@mail.com",
            password:
              "$argon2id$v=19$m=65536,t=3,p=4$aoeCUKn+4UX1pkX7ESxk4g$rz+1GkqG7owCPtWSGMfg0GauPs4zhNhVmKAkhAVriQw",
          },
          ...new Array(faker.number.int({ min: 5, max: 100 }))
            .fill(null)
            .map(() => ({
              email: faker.internet.email(),
              password:
                "$argon2id$v=19$m=65536,t=3,p=4$aoeCUKn+4UX1pkX7ESxk4g$rz+1GkqG7owCPtWSGMfg0GauPs4zhNhVmKAkhAVriQw",
              role: faker.helpers.arrayElement([
                UserRoles.MODERATOR,
                UserRoles.RECRUITER,
              ]),
            })),
        ],
      },
    },
  };
};
