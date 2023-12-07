const { faker } = require("@faker-js/faker");

const getRandomNumber = (min, max) => faker.number.int({ min, max });
const rangeArray = (a, b = 0) => {
  const array = [];

  for (let i = Math.min(a, b); i < Math.max(a, b); i++) {
    array.push(i);
  }

  return array;
};

module.exports = {
  getRandomNumber,
  rangeArray,
};
