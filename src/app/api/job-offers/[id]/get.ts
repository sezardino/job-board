import { bllService } from "@/services/bll";
import { OneOfferResponse } from "@/services/bll/modules/job-offers/schema";
import { NextResponse } from "next/server";

export const getJobOffer = async (
  _: any,
  params: { params: { id: string } }
) => {
  const res = await bllService.jobOffers.one(params.params.id);

  return NextResponse.json(res as OneOfferResponse, { status: 200 });
};
