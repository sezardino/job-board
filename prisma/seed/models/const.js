const { EntityStatus } = require("@prisma/client");

const statuses = Object.values(EntityStatus);

module.exports = {
  statuses,
};
