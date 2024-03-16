import { bllService } from "@/services/bll";
import { CreateJobOfferResponse } from "@/services/server/modules/job-offers/schema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const postCreateJobOffer = async (req: NextRequest) => {
  const body = await req.json();
  const session = await getServerSession();

  if (!session?.user.companyId)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const newOffer = await bllService.jobOffers.create(
      body,
      session?.user.companyId
    );

    return NextResponse.json(
      { status: !!newOffer.id } as CreateJobOfferResponse,
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(error as {}, { status: 500 });
  }
};
