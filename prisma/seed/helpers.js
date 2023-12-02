const { faker } = require("@faker-js/faker");

const rangeArray = (a, b = 0) => {
  const array = [];

  for (let i = Math.min(a, b); i < Math.max(a, b); i++) {
    array.push(i);
  }

  return array;
};

const getRandomNumber = (min, max) => faker.number.int({ min, max });

module.exports = {
  rangeArray,
  getRandomNumber,
};
