const { UserRoles, UserStatus } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const { rangeArray } = require("./helpers");

// password: "password",
const mockPassword =
  "$argon2id$v=19$m=65536,t=3,p=4$aoeCUKn+4UX1pkX7ESxk4g$rz+1GkqG7owCPtWSGMfg0GauPs4zhNhVmKAkhAVriQw";

const generateMockUser = ({
  roles = [UserRoles.CUSTOMER],
  status = [UserStatus.ACTIVE],
}) => ({
  email: faker.internet.email(),
  isEmailVerified: true,
  name: faker.person.fullName(),
  password: mockPassword,
  role: faker.helpers.arrayElement(roles),
  status: faker.helpers.arrayElement(status),
});

function generateMockUsers(args) {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateMockUser(rest));
}

module.exports = {
  generateMockUsers,
};
