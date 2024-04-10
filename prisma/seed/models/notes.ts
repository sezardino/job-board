import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { rangeArray } from "./helpers";

type Args = {
  count?: number;
  applicationId: string;
  usersIds: string[];
};

const generateMockNote = (
  args: Omit<Args, "count">
): Prisma.NoteCreateManyInput => {
  const { applicationId, usersIds } = args;

  return {
    applicationId,
    authorId: faker.helpers.arrayElement(usersIds),
    content: faker.lorem.paragraphs(2),
    name: faker.lorem.words(3),
  };
};

export const generateMockNotes = (args: Args) => {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateMockNote(rest));
};
