import { formatUrlSearchParams } from "@/app/api/utils";
import { bllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";

export const getCommonOffers = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const body = formatUrlSearchParams(req.nextUrl.searchParams);

  const res = await bllService.offers.commonOffers(body, params.params.id);

  return NextResponse.json(res, { status: 200 });
};
