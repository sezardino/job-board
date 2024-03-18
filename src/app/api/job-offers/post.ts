import { bllService } from "@/services/bll";
import { CreateJobOfferResponse } from "@/services/bll/modules/job-offers/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const postCreateJobOffer = async (req: NextRequest) => {
  const body = await req.json();
  const session = await getServerSession();

  const newOffer = await bllService.jobOffers.create(
    body,
    session?.user.companyId!
  );

  return NextResponse.json(
    { status: !!newOffer.id } as CreateJobOfferResponse,
    { status: 201 }
  );
};
