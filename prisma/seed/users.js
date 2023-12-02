const { faker } = require("@faker-js/faker");
const { UserRoles, UserStatus } = require("@prisma/client");
const { rangeArray } = require("./helpers");

// password: "password",
const mockPassword =
  "$argon2id$v=19$m=65536,t=3,p=4$aoeCUKn+4UX1pkX7ESxk4g$rz+1GkqG7owCPtWSGMfg0GauPs4zhNhVmKAkhAVriQw";

const getMockUser = ({
  roles = [UserRoles.CUSTOMER],
  company = null,
  status = [UserStatus.ACTIVE],
}) => ({
  email: faker.internet.email(),
  password: mockPassword,
  role: faker.helpers.arrayElement(roles),
  status: faker.helpers.arrayElement(status),
  companyId: company,
});

const getMockUsers = (args) =>
  rangeArray(args.count).map(() => getMockUser(args));

const owners = getMockUsers({
  count: 25,
  roles: [UserRoles.OWNER],
});

const customers = getMockUsers({
  count: 15,
  status: [UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.INACTIVE],
});

const mockUsers = [
  // @ts-ignore
  getMockUser({ roles: [UserRoles.ADMIN] }),
  // @ts-ignore
  getMockUser({ roles: [UserRoles.SUB_ADMIN] }),
  ...customers,
  ...owners,
];

module.exports = {
  mockUsers,
  getMockUser,
};
