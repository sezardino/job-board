import { formatUrlSearchParams } from "@/app/api/utils";
import { bllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";

export const getCommonJobOffers = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const body = formatUrlSearchParams(req.nextUrl.searchParams);

  const res = await bllService.jobOffers.commonJobOffers(
    body,
    params.params.id
  );

  return NextResponse.json(res, { status: 200 });
};
