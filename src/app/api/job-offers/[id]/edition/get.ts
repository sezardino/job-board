import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";

export const getJobOffer = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const session = await getNextAuthSession();

  const res = await bllService.jobOffers.editionData(
    params.params.id,
    session?.user?.companyId!
  );

  return NextResponse.json(res, { status: 200 });
};
