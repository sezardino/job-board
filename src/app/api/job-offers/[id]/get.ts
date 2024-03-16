import { bllService } from "@/services/bll";
import { OneOfferResponse } from "@/services/server/modules/job-offers/schema";
import { NextResponse } from "next/server";

export const getJobOffer = async (
  _: any,
  params: { params: { id: string } }
) => {
  try {
    const res = await bllService.jobOffers.one(params.params.id);

    return NextResponse.json(res as OneOfferResponse, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
