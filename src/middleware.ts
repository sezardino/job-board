import { UserRoles } from "@prisma/client";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import {
  AdminPageUrls,
  AdminRoles,
  CompanyPageUrls,
  CompanyRoles,
  CustomerPageUrls,
} from "./const";
import { nextAuthMiddleware } from "./libs/next-auth/middleware";

const customerPages = Object.values(CustomerPageUrls);

export default withAuth((req: NextRequestWithAuth) => {
  const currentPathName = req.nextUrl.pathname;
  const token = req.nextauth.token;

  const isAdminSubPage = currentPathName.startsWith(AdminPageUrls.home);
  const isCompanySubPage = currentPathName.startsWith(CompanyPageUrls.home);
  const isCustomerPage = customerPages.some((page) =>
    currentPathName.startsWith(page)
  );

  const isProtectedPage = isAdminSubPage || isCompanySubPage || isCustomerPage;

  if (!token && isProtectedPage) {
    // return NextResponse.redirect(new URL("/404", req.url));
    return NextResponse.redirect(
      new URL(`/${!token && isProtectedPage}`, req.url)
    );
  }

  if (token) {
    const isCompanyUser = CompanyRoles.includes(
      token.role as (typeof CompanyRoles)[number]
    );
    const isAdminUser = AdminRoles.includes(
      token.role as (typeof AdminRoles)[number]
    );
    const isCustomer = token.role === UserRoles.CUSTOMER;

    if (isAdminSubPage && !isAdminUser) {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    if (isCompanySubPage && !isCompanyUser) {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    if (isCustomerPage && !isCustomer) {
      return NextResponse.redirect(new URL("/404", req.url));
    }
  }
}, nextAuthMiddleware);
