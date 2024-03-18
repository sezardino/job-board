import { bllService, bllService } from "@/services/bll";
import { CurrentCompanyJobOffersRequest } from "@/services/bll/modules/job-offers/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getCurrentCompanyJobOffers = async (req: NextRequest) => {
  const data = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as CurrentCompanyJobOffersRequest;
  const session = await getNextAuthSession();

  const res = await bllService.jobOffers.companyOffers(
    data!,
    session!.user.companyId!
  );

  return NextResponse.json(res, { status: 200 });
};
