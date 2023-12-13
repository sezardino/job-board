const { UserRoles } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const { statuses } = require("./const");

const { generateMockUsers } = require("./users");

function generateSlug(name) {
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  const cleanedSlug = slug.replace(/[^\w-]/g, "");

  return cleanedSlug;
}

const generateMockCompany = () => {
  const name = faker.company.name();

  return {
    name,
    slug: generateSlug(name),
    status: faker.helpers.arrayElement(statuses),
    members: generateMockUsers({
      count: 5,
      roles: [UserRoles.MODERATOR, UserRoles.RECRUITER],
    }),
  };
};

module.exports = {
  generateMockCompany,
};
