const { UserRoles, Seniority, JobOfferStatus } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const { statuses, seniorities, jobOfferStatuses } = require("./const");

const { generateMockUsers } = require("./users");

function generateSlug(name) {
  const slug = name
    .toLowerCase()
    .replace(/[\s+&@#\/\\,;?!$%\^*:()'"\[\]]+/g, "-");

  const cleanedSlug = slug.replace(/-+/g, "-");

  return cleanedSlug;
}

const generateMockCompany = () => {
  const name = faker.company.name();

  return {
    name,
    email: faker.internet.email(),
    slug: generateSlug(name),
    status: faker.helpers.arrayElement(statuses),
    members: generateMockUsers({
      count: faker.number.int({ min: 5, max: 20 }),
      roles: [UserRoles.MODERATOR, UserRoles.RECRUITER],
    }),
  };
};

const generateMainMockCompany = (categoryIds, industryIds) => {
  return {
    name: "Main mock company",
    slug: "main-mock-company",
    status: "ACTIVE",
    owner: {
      create: {
        email: "company@mail.com",
        password:
          "$argon2id$v=19$m=65536,t=3,p=4$aoeCUKn+4UX1pkX7ESxk4g$rz+1GkqG7owCPtWSGMfg0GauPs4zhNhVmKAkhAVriQw",
      },
    },
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
            status: faker.helpers.arrayElement(jobOfferStatuses),
            level: faker.helpers.arrayElement(seniorities),
          })),
      },
    },
    members: {
      createMany: {
        data: new Array(faker.number.int({ min: 5, max: 100 }))
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
      },
    },
  };
};

module.exports = {
  generateMockCompany,
  generateMainMockCompany,
};
