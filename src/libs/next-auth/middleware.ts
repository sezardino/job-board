import { UserRoles } from "@prisma/client";
import { NextAuthMiddlewareOptions } from "next-auth/middleware";

const adminRoles = [UserRoles.ADMIN, UserRoles.SUB_ADMIN];
const companyRoles = [
  UserRoles.OWNER,
  UserRoles.MODERATOR,
  UserRoles.RECRUITER,
];

export const nextAuthMiddleware: NextAuthMiddlewareOptions = {
  callbacks: {
    authorized: ({ req, token }) => {
      const currentPathName = req.nextUrl.pathname;

      if (
        currentPathName.startsWith("/admin") &&
        token &&
        !adminRoles.includes(token.role as (typeof adminRoles)[number])
      ) {
        return false;
      }

      if (
        currentPathName.startsWith("/company") &&
        token &&
        !companyRoles.includes(token.role as (typeof companyRoles)[number])
      ) {
        return false;
      }

      if (
        currentPathName.startsWith("/user") &&
        token &&
        token.role !== UserRoles.CUSTOMER
      ) {
        return false;
      }

      return true;
    },
  },
};

export default nextAuthMiddleware;
