import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { ChangeOfferStatusRequest } from "@/services/bll/modules/offers/schema";
import { NextRequest, NextResponse } from "next/server";

export const patchChangeOfferStatus = async (
  req: NextRequest,
  params: { params: { id: string } }
) => {
  const data = (await req.json()) as ChangeOfferStatusRequest;
  const session = await getNextAuthSession();

  const success = await bllService.offers.changeStatus({
    ...data,
    offerId: params.params.id,
    companyId: session?.user.companyId!,
  });

  return NextResponse.json({ success }, { status: 200 });
};
