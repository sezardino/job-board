import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { CurrentCompanyOffersRequest } from "@/services/bll/modules/offers/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getCurrentCompanyOffers = async (req: NextRequest) => {
  const data = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as CurrentCompanyOffersRequest;
  const session = await getNextAuthSession();

  const res = await bllService.offers.companyOffers(
    data!,
    session!.user.companyId!
  );

  return NextResponse.json(res, { status: 200 });
};
