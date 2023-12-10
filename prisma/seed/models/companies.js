const { UserRoles } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const { statuses } = require("./const");

const { generateMockUsers } = require("./users");

const generateMockCompany = () => ({
  name: faker.company.name(),
  status: faker.helpers.arrayElement(statuses),
  bio: faker.lorem.paragraph(),
  members: generateMockUsers({
    count: 5,
    roles: [UserRoles.MODERATOR, UserRoles.RECRUITER],
  }),
});

module.exports = {
  generateMockCompany,
};
