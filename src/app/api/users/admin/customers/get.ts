import { formatUrlSearchParams } from "@/app/api/utils";
import { bllService } from "@/services/bll";
import { CustomerUsersResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";

export const getCustomers = async (req: NextRequest) => {
  const params = formatUrlSearchParams(req.nextUrl.searchParams);

  const res = await bllService.users.customers(params);

  return NextResponse.json(res as CustomerUsersResponse, { status: 200 });
};
