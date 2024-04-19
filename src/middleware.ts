import { UserRoles } from "@prisma/client";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
  AdminPageUrls,
  AdminRoles,
  CompanyPageUrls,
  CompanyRoles,
  CustomerPageUrls,
  PublicPageUrls,
} from "./const";
import nextAuthMiddleware from "./libs/next-auth/middleware";

const customerPages = Object.values(CustomerPageUrls);

export default withAuth((req: NextRequestWithAuth) => {
  const currentPathName = req.nextUrl.pathname;
  const token = req.nextauth.token;

  if (
    !token &&
    (currentPathName.startsWith(AdminPageUrls.home) ||
      currentPathName.startsWith(CompanyPageUrls.home) ||
      customerPages.some((page) => currentPathName.startsWith(page)))
  ) {
    return NextResponse.redirect(new URL(PublicPageUrls.login, req.url));
  }

  if (
    currentPathName.startsWith(AdminPageUrls.home) &&
    token &&
    !AdminRoles.includes(token.role as (typeof AdminRoles)[number])
  ) {
    return NextResponse.redirect(new URL("/404", req.url));
  }

  if (
    currentPathName.startsWith(CompanyPageUrls.home) &&
    token &&
    !CompanyRoles.includes(token.role as (typeof CompanyRoles)[number])
  ) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  if (
    customerPages.some((page) => currentPathName.startsWith(page)) &&
    token &&
    token.role !== UserRoles.CUSTOMER
  ) {
    return NextResponse.rewrite(new URL("/404", req.url));
  }
}, nextAuthMiddleware);
