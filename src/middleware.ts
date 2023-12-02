import { UserRoles } from "@prisma/client";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
  AdminPageUrls,
  CompanyPageUrls,
  PublicPageUrls,
  UserPageUrls,
} from "./const";
import nextAuthMiddleware from "./libs/next-auth/middleware";

const adminRoles = [UserRoles.ADMIN, UserRoles.SUB_ADMIN];
const companyRoles = [
  UserRoles.OWNER,
  UserRoles.MODERATOR,
  UserRoles.RECRUITER,
];

export default withAuth((req: NextRequestWithAuth) => {
  const currentPathName = req.nextUrl.pathname;
  const token = req.nextauth.token;

  if (
    !token &&
    (currentPathName.startsWith(AdminPageUrls.home) ||
      currentPathName.startsWith(CompanyPageUrls.home) ||
      currentPathName.startsWith(UserPageUrls.home))
  ) {
    return NextResponse.rewrite(new URL(PublicPageUrls.login, req.url));
  }

  if (
    currentPathName.startsWith(AdminPageUrls.home) &&
    token &&
    !adminRoles.includes(token.role as (typeof adminRoles)[number])
  ) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  if (
    currentPathName.startsWith(CompanyPageUrls.home) &&
    token &&
    !companyRoles.includes(token.role as (typeof companyRoles)[number])
  ) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  if (
    currentPathName.startsWith(UserPageUrls.home) &&
    token &&
    token.role !== UserRoles.CUSTOMER
  ) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }
}, nextAuthMiddleware);
