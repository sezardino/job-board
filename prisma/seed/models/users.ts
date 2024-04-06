import { faker } from "@faker-js/faker";
import { Prisma, UserRoles, UserStatus } from "@prisma/client";
import { mockPassword } from "./const";
import { rangeArray } from "./helpers";

type Args = {
  count?: number;
  roles?: UserRoles[];
  status?: UserStatus[];
};

export const generateMockUser = (
  args: Omit<Args, "count">
): Prisma.UserCreateInput => {
  const { roles = [UserRoles.CUSTOMER], status = [UserStatus.ACTIVE] } = args;

  const email = faker.internet.email();
  const emailToken = faker.internet.userName();

  return {
    email,
    emailToken,
    isAcceptInvite: true,
    emailVerified: true,
    name: faker.person.fullName(),
    password: mockPassword,
    role: faker.helpers.arrayElement(roles),
    status: faker.helpers.arrayElement(status),
  };
};

export const generateMockUsers = (args: Args) => {
  const { count = 10, ...rest } = args;

  return rangeArray(count).map(() => generateMockUser(rest));
};
