import { faker } from "@faker-js/faker";
import { PrismaClient, UserRoles, UserStatus } from "@prisma/client";
import { generateMockCompany } from "./models/companies";
import { mockCompanyOwner } from "./models/const";
import { industries, industriesAndCategories } from "./models/industries";
import { generateMockOffers } from "./models/offers";
import { generateMockUsers } from "./models/users";

const prisma = new PrismaClient();

const generateIndustries = async () => {
  await prisma.$transaction(
    industries.map((name) =>
      prisma.industry.create({
        data: {
          name,
          status: "ACTIVE",
          categories: {
            createMany: {
              data: industriesAndCategories[name].map((name) => ({
                name,
                status: "ACTIVE",
              })),
            },
          },
        },
      })
    )
  );
};

const generateCompanies = async () => {
  const ownersData = generateMockUsers({
    count: faker.number.int({ min: 20, max: 100 }),
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
        count: faker.number.int({ min: 20, max: 100 }),
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
    count: faker.number.int({ min: 1, max: 2 }),
    roles: [UserRoles.ADMIN],
  });

  const subAdmins = generateMockUsers({
    count: faker.number.int({ min: 1, max: 2 }),
    roles: [UserRoles.SUB_ADMIN],
  });

  const customers = generateMockUsers({
    count: faker.number.int({ min: 5, max: 20 }),
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
  if (!prisma) return;

  try {
    console.log("Seeding database...");
    console.log("Generating industries...");
    await generateIndustries();
    console.log("Generating users...");
    await generateUsers();
    console.log("Generating companies...");
    await generateCompanies();
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
