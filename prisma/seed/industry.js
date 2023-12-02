const { faker } = require("@faker-js/faker");
const { EntityStatus } = require("@prisma/client");
const { rangeArray } = require("./helpers");

const industryStatuses = Object.values(EntityStatus);

const getMockIndustries = (count) =>
  rangeArray(count).map(() => {
    return {
      name: faker.person.jobArea(),
      status: faker.helpers.arrayElement(industryStatuses),
    };
  });

const mockIndustries = getMockIndustries(faker.number.int({ min: 5, max: 20 }));

module.exports = {
  mockIndustries,
};
