import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { OfferApplicationsStatisticsRequest } from "@/services/bll/modules/application/schema/offer-statistics";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getOfferApplicationsStatistics = async (req: NextRequest) => {
  const params = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as OfferApplicationsStatisticsRequest;
  const session = await getNextAuthSession();

  const data = await bllService.applications.offerStatistics({
    ...params,
    companyId: session?.user?.companyId!,
  });

  return NextResponse.json({ data }, { status: 200 });
};
