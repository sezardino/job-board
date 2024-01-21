const { UserRoles, UserStatus } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const { rangeArray } = require("./helpers");
const { mockPassword } = require("./const");

const generateMockUser = ({
  roles = [UserRoles.CUSTOMER],
  status = [UserStatus.ACTIVE],
}) => {
  const email = faker.internet.email();
  const emailToken = faker.internet.userName();

  return {
    email,
    emailToken,
    isAcceptInvite: true,
    name: faker.person.fullName(),
    password: mockPassword,
    role: faker.helpers.arrayElement(roles),
    status: faker.helpers.arrayElement(status),
  };
};

function generateMockUsers(args) {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateMockUser(rest));
}

module.exports = {
  generateMockUsers,
};
