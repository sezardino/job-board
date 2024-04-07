import { faker } from "@faker-js/faker";
import { PrismaClient, UserRoles, UserStatus } from "@prisma/client";
import { generateMockApplications } from "./models/application";
import { generateMockCompany } from "./models/companies";
import { mockCompanyOwner } from "./models/const";
import { generateCurriculumVitae } from "./models/curriculum-vitae";
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

  const categoriesCount = await prisma.category.count();
  const industriesCount = await prisma.industry.count();

  console.log(`Generated industries: ${categoriesCount}`);
  console.log(`Generated categories: ${industriesCount}`);
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

  const ownersData = generateMockUsers({
    count: faker.number.int({ min: 100, max: 200 }),
    roles: [UserRoles.OWNER],
  });

  const mockUsers = [
    ...admins,
    ...subAdmins,
    ...customers,
    ...ownersData,
    mockCompanyOwner,
  ];

  await Promise.all([
    await prisma.user.createMany({
      data: mockUsers,
    }),
  ]);

  const usersCount = await prisma.user.count();

  console.log(`Generated users: ${usersCount}`);
};

const generateCompanies = async () => {
  const owners = await prisma.user.findMany({
    where: { role: UserRoles.OWNER },
    select: { id: true },
  });

  await Promise.all([
    ...owners.map(async (owner) => {
      const { ...rest } = generateMockCompany();

      await prisma.company.create({
        data: {
          ...rest,
          members: { connect: { id: owner.id } },
        },
      });
    }),
  ]);

  const companiesCount = await prisma.company.count();

  console.log(`Generated companies: ${companiesCount}`);
};

const generateCompanyMembers = async () => {
  const companies = await prisma.company.findMany({
    select: { id: true },
  });

  const companyMembers = companies.map((company) => ({
    companyId: company.id,
    members: generateMockUsers({
      count: faker.number.int({ min: 1, max: 10 }),
      roles: [UserRoles.MODERATOR, UserRoles.RECRUITER],
    }),
  }));

  await Promise.all(
    companyMembers.map(async ({ companyId, members }) =>
      members.map(
        async (member) =>
          await prisma.user.create({
            data: {
              ...member,
              company: { connect: { id: companyId } },
            },
          })
      )
    )
  );

  const companyMembersCount = companyMembers.reduce(
    (acc, { members }) => acc + members.length,
    0
  );

  console.log(`Generated company members: ${companyMembersCount}`);
};

const generateOffers = async () => {
  const companies = await prisma.company.findMany({
    select: { id: true },
  });
  const industries = await prisma.industry.findMany({
    select: { id: true, categories: { select: { id: true } } },
  });

  const offers = companies.map((company) =>
    generateMockOffers({
      count: faker.number.int({ min: 1, max: 10 }),
      companyId: company.id,
      industries: industries,
    })
  );

  await Promise.all(
    offers.flat().map(
      async (data) =>
        await prisma.offer.create({
          data,
        })
    )
  );

  const offersCount = await prisma.offer.count();

  console.log(`Generated offers: ${offersCount}`);
};

const generateDevData = async () => {
  const owner = await prisma.user.create({
    data: mockCompanyOwner,
    select: { id: true },
  });

  const company = await prisma.company.create({
    data: {
      ...generateMockCompany(),
      members: { connect: { id: owner.id } },
    },
  });

  const industries = await prisma.industry.findMany({
    select: { id: true, categories: { select: { id: true } } },
  });

  const mockOffers = generateMockOffers({
    count: faker.number.int({ min: 1, max: 2 }),
    companyId: company.id,
    industries: industries,
  });

  await Promise.all(
    mockOffers.flat().map(
      async (data) =>
        await prisma.offer.create({
          data,
        })
    )
  );

  const offersCount = await prisma.offer.count();

  console.log(`Generated offers: ${offersCount}`);

  const offers = await prisma.offer.findMany({
    where: { companyId: company.id },
    select: { id: true },
  });

  const testCV = await prisma.curriculumVitae.create({
    data: generateCurriculumVitae(),
    select: { id: true },
  });

  if (!testCV) {
    console.log("Test CV not found");
    return;
  }

  await Promise.all(
    offers.map(async (offer) => {
      const application = generateMockApplications({
        offerId: offer.id,
        cvId: testCV.id,
        count: faker.number.int({ min: 100, max: 1000 }),
      });

      await prisma.application.createMany({
        data: application,
      });
    })
  );

  const applicationsCount = await prisma.application.count();

  console.log(`Generated applications: ${applicationsCount}`);
};

const generateApplications = async () => {
  const offers = await prisma.offer.findMany({
    select: { id: true },
  });

  const testCV = await prisma.curriculumVitae.create({
    data: generateCurriculumVitae(),
    select: { id: true },
  });

  if (!testCV) {
    console.log("Test CV not found");
    return;
  }

  await Promise.all(
    offers.map(async (offer) => {
      const application = generateMockApplications({
        offerId: offer.id,
        cvId: testCV.id,
        count: faker.number.int({ min: 100, max: 1000 }),
      });

      await prisma.application.createMany({
        data: application,
      });
    })
  );

  const ApplicationsCount = await prisma.application.count();

  console.log(`Generated applications: ${ApplicationsCount}`);
};

(async () => {
  if (!prisma) return;

  try {
    console.log("Seeding database...");
    console.log("Generating industries...");
    await generateIndustries();

    if (true) {
      await generateDevData();
      return;
    }

    console.log("Generating users...");
    await generateUsers();
    console.log("Generating companies...");
    await generateCompanies();
    console.log("Generating company members...");
    await generateCompanyMembers();
    console.log("Generating offers...");
    await generateOffers();
    console.log("Generating applications...");
    await generateApplications();
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
