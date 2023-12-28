const { Seniority, JobOfferStatus } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const { rangeArray } = require("./helpers");
const {
  seniorities,
  jobOfferStatuses,
  jobDescriptionHTML,
  jobSkills,
} = require("./const");

const generateMockOffer = ({ companyId, industries }) => {
  const industryId = faker.helpers.arrayElement(industries).id;
  const categoryId = faker.helpers.arrayElement(
    industries.find((i) => i.id === industryId).categories
  ).id;

  const from = faker.number.float({ min: 1000, max: 10000 });

  const to = faker.number.float({ min: from, max: 100000 });

  const skills = faker.helpers
    .shuffle(jobSkills)
    .slice(1, faker.number.int({ min: 1, max: 10 }))
    .map((name) => ({
      name,
      level: faker.helpers.arrayElement(seniorities),
    }));

  return {
    name: faker.company.catchPhraseNoun(),
    industryId,
    categoryId,
    companyId,
    skills,
    description: jobDescriptionHTML,
    level: faker.helpers.arrayElement(seniorities),
    status: faker.helpers.arrayElement(jobOfferStatuses),
    salary: { from, to },
  };
};

function generateMockOffers(args) {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateMockOffer(rest));
}

module.exports = {
  generateMockOffers,
};
