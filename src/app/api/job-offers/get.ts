import { bllService } from "@/services/bll";
import { OffersListRequest } from "@/services/server/modules/job-offers/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../utils";

export const getOffersList = async (req: NextRequest) => {
  const params = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as OffersListRequest;

  try {
    const res = await bllService.jobOffers.list(params);

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Cant get offers list", error },
      { status: 500 }
    );
  }
};
