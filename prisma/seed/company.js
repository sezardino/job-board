const { faker } = require("@faker-js/faker");
const { EntityStatus } = require("@prisma/client");

const getMockCompany = (ownerId) => {
  return {
    name: faker.company.name(),
    owner: { connect: { id: ownerId } },
    status: faker.helpers.arrayElement([
      EntityStatus.ACTIVE,
      EntityStatus.INACTIVE,
      EntityStatus.INACTIVE,
    ]),
  };
};

const getMockCompanies = (ownerIds) => ownerIds.map(getMockCompany);

module.exports = {
  getMockCompanies,
};
