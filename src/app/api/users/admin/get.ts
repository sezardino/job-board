import { bllService } from "@/services/bll";
import { AdminUsersResponse } from "@/services/bll/modules/users/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getAdmins = async (req: NextRequest) => {
  const params = formatUrlSearchParams(req.nextUrl.searchParams);

  const res = await bllService.users.admin(params);

  return NextResponse.json(res as AdminUsersResponse, { status: 200 });
};
