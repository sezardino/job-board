import { bllService } from "@/services/bll";
import {
  CheckCompanyNameAvailableRequest,
  CheckCompanyNameAvailableResponse,
} from "@/services/server/modules/companies/schema";
import { NextRequest, NextResponse } from "next/server";
import { formatUrlSearchParams } from "../../utils";

export const getCompanyNameAvailability = async (req: NextRequest) => {
  const params = formatUrlSearchParams(
    req.nextUrl.searchParams
  ) as CheckCompanyNameAvailableRequest;

  try {
    const bllResponse = await bllService.companies.checkNameAvailable(
      params.name
    );

    return NextResponse.json(
      { available: !bllResponse } as CheckCompanyNameAvailableResponse,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Can't check name" }, { status: 500 });
  }
};
