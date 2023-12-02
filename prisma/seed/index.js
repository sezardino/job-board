const {
  PrismaClient,
  UserRoles,
  EntityStatus,
  UserStatus,
} = require("@prisma/client");
const { getMockCategories } = require("./category");
const { getMockCompanies } = require("./company");
const { getRandomNumber } = require("./helpers");
const { mockIndustries } = require("./industry");
const { getMockUsers, mockUsers } = require("./users");

const prisma = new PrismaClient();

const generateBaseData = async () => {
  await Promise.all([
    ...mockUsers.map(async (user) => {
      await prisma.user.upsert({
        where: {
          email: user.email,
        },
        update: {
          ...user,
        },
        // @ts-ignore
        create: {
          ...user,
        },
      });
    }),
    ...mockIndustries.map(async (industry) => {
      await prisma.industry.upsert({
        where: {
          name: industry.name,
        },
        update: {
          ...industry,
        },
        // @ts-ignore
        create: {
          ...industry,
          categories: {
            create: getMockCategories(getRandomNumber(5, 10)),
          },
        },
      });
    }),
  ]);
};

const generateCompanyData = async () => {
  const owners = await prisma.user.findMany({
    where: { role: UserRoles.OWNER },
  });
  const companiesMock = getMockCompanies(owners.map((owner) => owner.id));
  await Promise.all(
    companiesMock.map(async (company) => {
      await prisma.company.create({
        data: {
          name: company.name,
          owner: { connect: { id: company.ownerId } },
          status: company.status,
        },
      });
    })
  );
  const companies = await prisma.company.findMany();
  const users = companies.map((company) =>
    getMockUsers({
      count: getRandomNumber(5, 10),
      roles: [UserRoles.MODERATOR, UserRoles.RECRUITER],
      company: company.id,
      status: [
        company.status === EntityStatus.INACTIVE
          ? UserStatus.INACTIVE
          : UserStatus.ACTIVE,
        UserStatus.BLOCKED,
        UserStatus.INACTIVE,
      ],
    })
  );
  await Promise.all(
    users.map(async (users) => {
      await Promise.all(
        users.map(async (user) => {
          await prisma.user.upsert({
            where: {
              email: user.email,
            },
            update: {
              ...user,
            },
            // @ts-ignore
            create: {
              ...user,
            },
          });
        })
      );
    })
  );
};

(async () => {
  try {
    await generateBaseData();
    await generateCompanyData();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
