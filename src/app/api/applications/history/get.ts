import { AdminRoles } from "@/const";
import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { ApplicationHistoryRequest } from "@/services/bll/modules/application/schema";
import { BadRequestException } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getApplicationHistory = async (req: NextRequest) => {
  const params = formatUrlSearchParams<ApplicationHistoryRequest>(
    req.nextUrl.searchParams
  );
  const session = await getNextAuthSession();
  const isAdmin = AdminRoles.some((role) => role === session?.user.role);

  if (isAdmin && !params.customerId)
    throw new BadRequestException("customerId is required");

  const data = await bllService.applications.history({
    ...params,
    customerId: isAdmin ? params.customerId : session?.user.id!,
  });

  return NextResponse.json(data, { status: 200 });
};
