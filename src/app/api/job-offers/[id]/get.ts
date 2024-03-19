import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getJobOffer = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const body = formatUrlSearchParams(req.nextUrl.searchParams);
  const session = await getNextAuthSession();

  const res = await bllService.jobOffers.preview({
    id: params.params.id,
    companyId: session?.user?.companyId,
    ...body,
  });

  return NextResponse.json(res, { status: 200 });
};
