import { UserRoles } from "@prisma/client";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const adminRoles = [UserRoles.ADMIN, UserRoles.SUB_ADMIN];
const companyRoles = [
  UserRoles.OWNER,
  UserRoles.MODERATOR,
  UserRoles.RECRUITER,
];

export default withAuth(
  (req: NextRequestWithAuth) => {
    const currentPathName = req.nextUrl.pathname;
    const token = req.nextauth.token;

    if (
      currentPathName.startsWith("/admin") &&
      token &&
      !adminRoles.includes(token.role as (typeof adminRoles)[number])
    ) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    if (
      currentPathName.startsWith("/company") &&
      token &&
      !companyRoles.includes(token.role as (typeof companyRoles)[number])
    ) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }

    if (
      currentPathName.startsWith("/user") &&
      token &&
      token.role !== UserRoles.CUSTOMER
    ) {
      return NextResponse.rewrite(new URL("/404", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
