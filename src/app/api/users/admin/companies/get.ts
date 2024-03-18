import { formatUrlSearchParams } from "@/app/api/utils";
import { bllService } from "@/services/bll";
import { CompaniesUsersResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const getCompanyUsers = async (req: NextRequest) => {
  const params = formatUrlSearchParams(req.nextUrl.searchParams);

  const res = await bllService.users.companyUsers(params);

  return NextResponse.json(res as CompaniesUsersResponse, { status: 200 });
};
