import { bllService } from "@/services/bll";
import {
  CheckCompanyNameAvailableRequest,
  CheckCompanyNameAvailableResponse,
} from "@/services/bll/modules/companies/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getCompanyNameAvailability = async (req: NextRequest) => {
  const params = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as CheckCompanyNameAvailableRequest;

  const bllResponse = await bllService.companies.checkNameAvailable(
    params.name
  );

  return NextResponse.json(
    { available: !bllResponse } as CheckCompanyNameAvailableResponse,
    { status: 200 }
  );
};
