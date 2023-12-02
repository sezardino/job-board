const { faker } = require("@faker-js/faker");
const { EntityStatus } = require("@prisma/client");
const { rangeArray } = require("./helpers");

const statuses = Object.values(EntityStatus);

const getMockCategories = (count) =>
  rangeArray(count).map(() => {
    return {
      name: faker.person.jobType(),
      status: faker.helpers.arrayElement(statuses),
    };
  });

module.exports = {
  getMockCategories,
};
