import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { DeleteJobOfferResponse } from "@/services/bll/modules/job-offers/schema/delete";
import { NextRequest, NextResponse } from "next/server";

export const deleteJobOffer = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const session = await getNextAuthSession();

  const response = await bllService.jobOffers.delete(
    params.params.id,
    session?.user.companyId!
  );

  return NextResponse.json(
    { success: !!response.id } as DeleteJobOfferResponse,
    { status: 200 }
  );
};
