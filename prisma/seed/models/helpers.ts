import { faker } from "@faker-js/faker";

export const getRandomNumber = (min: number, max: number) =>
  faker.number.int({ min, max });

export const rangeArray = (a: number, b = 0) => {
  const array = [];

  for (let i = Math.min(a, b); i < Math.max(a, b); i++) {
    array.push(i);
  }

  return array;
};
