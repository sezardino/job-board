import { getNextAuthSession } from "@/libs/next-auth";
import { bllService } from "@/services/bll";
import { OfferApplicationsRequest } from "@/services/bll/modules/application/schema/list";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../utils";

export const getOfferApplications = async (req: NextRequest) => {
  const params = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as OfferApplicationsRequest;
  const session = await getNextAuthSession();

  const data = await bllService.applications.list({
    ...params,
    companyId: session?.user?.companyId!,
  });

  return NextResponse.json({ data }, { status: 200 });
};
