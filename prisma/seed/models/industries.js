const { faker } = require("@faker-js/faker");

const { rangeArray } = require("./helpers");
const { statuses } = require("./const");

const generateMockIndustries = (count = 5) =>
  rangeArray(count).map(() => {
    return {
      name: faker.person.jobArea(),
      status: faker.helpers.arrayElement(statuses),
    };
  });

module.exports = {
  generateMockIndustries,
};
