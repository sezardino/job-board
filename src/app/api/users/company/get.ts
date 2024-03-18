import { bllService } from "@/services/bll";
import { CompaniesUsersResponse } from "@/services/bll/modules/users/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getCompanyUsers = async (req: NextRequest) => {
  const params = formatUrlSearchParams(req.nextUrl.searchParams);
  const session = await getServerSession();

  const res = await bllService.users.company(params, session!.user.companyId!);

  return NextResponse.json(res as CompaniesUsersResponse, { status: 200 });
};
