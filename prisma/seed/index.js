const { PrismaClient, UserRoles, UserStatus } = require("@prisma/client");

const { faker } = require("@faker-js/faker");

const { generateMockUsers } = require("./models/users");
const { industries } = require("./models/industries");
const { categories } = require("./models/categories");
const { generateMockCompany } = require("./models/companies");
const { generateMockOffers } = require("./models/offers");
const { mockCompanyOwner } = require("./models/const");

const { statuses } = require("./models/const");

const prisma = new PrismaClient();

const generateIndustries = async () => {
  await prisma.industry.createMany({
    data: Object.values(industries).map((name) => ({
      name,
      status: statuses.ACTIVE,
    })),
  });

  const industriesDB = await prisma.industry.findMany({
    select: { id: true, name: true },
  });

  await Promise.all([
    ...industriesDB.map(async (industry) => {
      await prisma.category.createMany({
        data: categories[industry.name].map((name) => ({
          name,
          status: "ACTIVE",
          industryId: industry.id,
        })),
      });
    }),
  ]);
};

const generateCompanies = async () => {
  const ownersData = generateMockUsers({
    count: faker.number.int({ min: 5, max: 20 }),
    roles: [UserRoles.OWNER],
  });

  await prisma.user.createMany({
    data: [...ownersData, mockCompanyOwner],
  });

  const owners = await prisma.user.findMany({
    where: { role: UserRoles.OWNER },
    select: { id: true },
  });

  await Promise.all([
    ...owners.map(async (owner) => {
      const { members, ...rest } = generateMockCompany();

      await prisma.company.create({
        data: {
          ...rest,
          owner: { connect: { id: owner.id } },
          members: { connect: { id: owner.id }, createMany: { data: members } },
        },
      });
    }),
  ]);

  const companies = await prisma.company.findMany({
    select: { id: true },
  });
  const industries = await prisma.industry.findMany({
    select: { id: true, categories: { select: { id: true } } },
  });

  await Promise.all([
    ...companies.map(async (company) => {
      const offers = generateMockOffers({
        count: faker.number.int({ min: 10, max: 50 }),
        companyId: company.id,
        industries: industries,
      });

      await prisma.jobOffer.createMany({
        data: offers,
      });
    }),
  ]);
};

const generateUsers = async () => {
  const admins = generateMockUsers({
    count: faker.number.int({ min: 1, max: 5 }),
    roles: [UserRoles.ADMIN],
  });

  const subAdmins = generateMockUsers({
    count: faker.number.int({ min: 1, max: 20 }),
    roles: [UserRoles.SUB_ADMIN],
  });

  const customers = generateMockUsers({
    count: faker.number.int({ min: 20, max: 100 }),
    status: [UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.INACTIVE],
  });

  const mockUsers = [...admins, ...subAdmins, ...customers];

  await Promise.all([
    await prisma.user.createMany({
      data: mockUsers,
    }),
  ]);
};

(async () => {
  try {
    await generateUsers();
    await generateIndustries();
    await generateCompanies();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
