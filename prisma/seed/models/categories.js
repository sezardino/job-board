const { faker } = require("@faker-js/faker");

const { rangeArray } = require("./helpers");
const { statuses } = require("./const");

const generateMockCategories = (count = 5) =>
  rangeArray(count).map(() => {
    return {
      name: faker.person.jobType(),
      status: faker.helpers.arrayElement(statuses),
    };
  });

module.exports = {
  generateMockCategories,
};
