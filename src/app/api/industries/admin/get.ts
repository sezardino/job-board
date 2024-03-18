import { bllService } from "@/services/bll";
import { AdminIndustriesResponse } from "@/services/bll/modules/industries/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getIndustriesForManage = async (req: NextRequest) => {
  const params = formatUrlSearchParams(req.nextUrl.searchParams);

  const res = await bllService.industries.admin(params);

  return NextResponse.json(res as AdminIndustriesResponse, { status: 200 });
};
