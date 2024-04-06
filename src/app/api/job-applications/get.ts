import { bllService } from "@/services/bll";
import { JobOfferApplicationsRequest } from "@/services/bll/modules/job-application/schema/list";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../utils";

export const getJobOfferApplications = async (req: NextRequest) => {
  const params = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as JobOfferApplicationsRequest;

  const data = await bllService.jobApplications.list(params);

  return NextResponse.json({ data }, { status: 200 });
};
