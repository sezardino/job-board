import { bllService } from "@/services/bll";
import { AdminIndustriesResponse } from "@/services/server/modules/industries/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getIndustriesForManage = async (req: NextRequest) => {
  const params = formatUrlSearchParams(req.nextUrl.searchParams);

  try {
    const res = await bllService.industries.admin(params);

    return NextResponse.json(res as AdminIndustriesResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "backend-errors.server" },
      { status: 500 }
    );
  }
};
