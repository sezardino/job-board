import { bllService } from "@/services/bll";
import { AdminStatisticsRequest } from "@/services/bll/modules/statistics/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getAdminStatistics = async (req: NextRequest) => {
  const params = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as AdminStatisticsRequest;

  const res = await bllService.statistics.admin(params);

  return NextResponse.json(res, { status: 200 });
};
