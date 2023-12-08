const { PrismaClient, UserRoles, UserStatus } = require("@prisma/client");

const { generateMockUsers } = require("./models/users");
const { industries } = require("./models/industries");
const { categories } = require("./models/categories");
const { generateMockCompany } = require("./models/companies");

const { statuses } = require("./models/const");

const prisma = new PrismaClient();

const generateBaseData = async () => {
  const admins = generateMockUsers({
    count: 2,
    roles: [UserRoles.ADMIN],
  });

  const subAdmins = generateMockUsers({
    count: 5,
    roles: [UserRoles.SUB_ADMIN],
  });

  const owners = generateMockUsers({
    count: 5,
    roles: [UserRoles.OWNER],
  });

  const customers = generateMockUsers({
    count: 15,
    status: [UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.INACTIVE],
  });

  const mockUsers = [...admins, ...subAdmins, ...customers, ...owners];

  await Promise.all([
    await prisma.user.createMany({
      data: mockUsers,
    }),
    await prisma.industry.createMany({
      data: Object.values(industries).map((name) => ({
        name,
        status: statuses.ACTIVE,
      })),
    }),
  ]);
};

const generateRestData = async () => {
  const owners = await prisma.user.findMany({
    where: { role: UserRoles.OWNER },
  });

  const industries = await prisma.industry.findMany();

  await Promise.all([
    ...industries.map(async (industry) => {
      await prisma.category.createMany({
        data: categories[industry.name].map((name) => ({
          name,
          status: "ACTIVE",
          industryId: industry.id,
        })),
      });
    }),
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
};

(async () => {
  try {
    await generateBaseData();
    await generateRestData();
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
