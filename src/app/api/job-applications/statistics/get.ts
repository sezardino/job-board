import { bllService } from "@/services/bll";
import { JobOfferApplicationsStatisticsRequest } from "@/services/bll/modules/job-application/schema/job-offer-statistics";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getOfferApplicationsStatistics = async (req: NextRequest) => {
  const params = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as JobOfferApplicationsStatisticsRequest;

  const data = await bllService.jobApplications.offerStatistics(params);

  return NextResponse.json({ data }, { status: 200 });
};
