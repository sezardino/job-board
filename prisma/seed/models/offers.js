const { Seniority } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const { rangeArray } = require("./helpers");

const generateMockOffer = ({ companyId, industryId, categoryId }) => {
  const from = faker.number.float({ min: 1000, max: 10000 });

  const to = faker.number.float({ min: from, max: 100000 });

  return {
    name: faker.company.catchPhraseNoun(),
    industryId,
    categoryId,
    companyId,
    level: faker.helpers.arrayElement([
      Seniority.TRAINEE,
      Seniority.JUNIOR,
      Seniority.MIDDLE,
      Seniority.SENIOR,
      Seniority.LEAD,
      Seniority.ARCHITECT,
    ]),
    salary: {
      from,
      to,
      currency: faker.finance.currencyCode(),
    },
  };
};

function generateMockOffers(args) {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateMockOffer(rest));
}

module.exports = {
  generateMockOffers,
};
