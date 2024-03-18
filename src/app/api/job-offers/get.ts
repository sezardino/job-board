import { bllService } from "@/services/bll";
import { OffersListRequest } from "@/services/bll/modules/job-offers/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../utils";

export const getOffersList = async (req: NextRequest) => {
  const params = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as OffersListRequest;

  const res = await bllService.jobOffers.list(params);

  return NextResponse.json(res, { status: 200 });
};
